import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { shipIosApp } from "./ios-shipping/deploy-ios-shipping.module.code.ts"
import { IOS_APP, kindNamed } from "./kind-reading/deploy-kind-reading.module.code.ts"
import { putUpWebApp } from "./web-putting-up/deploy-web-putting-up.module.code.ts"

const INPUT = 1
const DATA = 2
const DRY_RUN = "--dry-run"
const NO_UPLOAD = "--no-upload"
const REF = "--ref"
const FLAGS = [DRY_RUN, NO_UPLOAD]

export interface RefNamed {
  readonly ref: string | null
  readonly rest: readonly string[]
}

export function refNamed(argv: readonly string[]): RefNamed | { readonly refused: string } {
  let ref: string | null = null
  const rest: string[] = []
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    let value: string | undefined
    if (one === REF) {
      value = argv[at]
      at += 1
    } else if (one.startsWith(`${REF}=`)) {
      value = one.slice(REF.length + 1)
    } else {
      rest.push(one)
      continue
    }
    if (value === undefined || value === "" || value.startsWith("-")) {
      return {
        refused: `\`${REF}\` takes the commit to build, and this call names none after it`,
      }
    }
    if (ref !== null) {
      return {
        refused: `\`${REF}\` is named twice, as \`${ref}\` and as \`${value}\`, so which commit is meant is unsettled`,
      }
    }
    ref = value
  }
  return { ref, rest }
}

export async function deploy(argv: readonly string[], given: Given): Promise<Answer> {
  const taken = refNamed(argv)
  if ("refused" in taken) return refused(taken.refused, INPUT)
  const { ref, rest } = taken
  const strange = rest.find((one) => one.startsWith("-") && !FLAGS.includes(one))
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha deploy\` takes`, INPUT)
  }
  const named = rest.filter((one) => !one.startsWith("-"))
  if (named.length === 0) {
    return refused("name the app to put up by the slug its page carries", INPUT)
  }
  if (named.length > 1) {
    return refused(
      `a deploy puts up one app, and ${named.length} were named, so which one is meant is unsettled: ${named.join(", ")}`,
      INPUT
    )
  }

  const slug = named[0] as string
  const read = kindNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  if (read.kind === IOS_APP) {
    if (rest.includes(DRY_RUN)) {
      return refused(
        `\`${slug}\` names an ios app, which is built and handed to Apple rather than applied to a cluster, so \`${DRY_RUN}\` says nothing about it — a build Apple validates and nobody is sent is \`${NO_UPLOAD}\``,
        INPUT
      )
    }
    return shipIosApp(slug, read.pagePath, rest.includes(NO_UPLOAD), ref)
  }
  if (rest.includes(NO_UPLOAD)) {
    return refused(
      `\`${slug}\` names a web app, which is put up rather than uploaded, so \`${NO_UPLOAD}\` says nothing about it — a run that applies nothing is \`${DRY_RUN}\``,
      INPUT
    )
  }
  if (ref !== null) {
    return refused(
      `\`${slug}\` names a web app, which is built from the commit this workstation's HEAD is at rather than from one told, so \`${REF}\` says nothing about it`,
      INPUT
    )
  }
  return putUpWebApp(slug, given, rest.includes(DRY_RUN))
}
