import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { shipIosApp } from "./deploy-ios-shipping/deploy-ios-shipping.module.code.ts"
import { IOS_APP, kindNamed } from "./deploy-kind-reading/deploy-kind-reading.module.code.ts"
import { putUpWebApp } from "./deploy-web-putting-up/deploy-web-putting-up.module.code.ts"

const INPUT = 1
const DATA = 2
const DRY_RUN = "--dry-run"
const NO_UPLOAD = "--no-upload"
const FLAGS = [DRY_RUN, NO_UPLOAD]

export async function deploy(argv: readonly string[], given: Given): Promise<Answer> {
  const strange = argv.find((one) => one.startsWith("-") && !FLAGS.includes(one))
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha deploy\` takes`, INPUT)
  }
  const named = argv.filter((one) => !one.startsWith("-"))
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
    if (argv.includes(DRY_RUN)) {
      return refused(
        `\`${slug}\` names an ios app, which is built and handed to Apple rather than applied to a cluster, so \`${DRY_RUN}\` says nothing about it — a build Apple validates and nobody is sent is \`${NO_UPLOAD}\``,
        INPUT
      )
    }
    return shipIosApp(slug, read.pagePath, argv.includes(NO_UPLOAD))
  }
  if (argv.includes(NO_UPLOAD)) {
    return refused(
      `\`${slug}\` names a web app, which is put up rather than uploaded, so \`${NO_UPLOAD}\` says nothing about it — a run that applies nothing is \`${DRY_RUN}\``,
      INPUT
    )
  }
  return putUpWebApp(slug, given, argv.includes(DRY_RUN))
}
