import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { IOS_APP, kindNamed } from "./deploy-kind-reading/deploy-kind-reading.module.code.ts"
import { putUpWebApp } from "./deploy-web-putting-up/deploy-web-putting-up.module.code.ts"

const INPUT = 1
const DATA = 2
const DRY_RUN = "--dry-run"

export async function deploy(argv: readonly string[], given: Given): Promise<Answer> {
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)
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
    return refused(
      `\`${slug}\` names the ios app ${read.pagePath}, and an ios app is not put up by this command yet`,
      DATA
    )
  }
  return putUpWebApp(slug, given, argv.includes(DRY_RUN))
}
