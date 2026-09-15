import { resolve } from "node:path"
import { refreshedWhole } from "akasha/pages/index/modules/indexing/indexing.module.code.ts"
import { checkoutHere } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { saidBy } from "akasha/utils/narrow/modules/said-by/said-by.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

const FAULT = 1

export function rootFrom(argv: readonly string[]): string {
  const said = argv[0]
  return said === undefined || said === "" ? checkoutHere() : resolve(said)
}

function builtAt(root: string): readonly string[] {
  const said = refreshedWhole(root, root, true)
  return [
    `the index under ${root} was built from the pages there`,
    `${counted(said.pages, "page")}, ${said.entries} entries, ` +
      `${counted(said.refused.length, "refusal")}`,
  ]
}

if (import.meta.main) {
  try {
    for (const line of builtAt(rootFrom(process.argv.slice(2)))) {
      process.stdout.write(`${line}\n`)
    }
  } catch (thrown) {
    process.stderr.write(`no index was built — ${saidBy(thrown)}\n`)
    process.exit(FAULT)
  }
}
