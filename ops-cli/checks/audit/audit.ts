export const summary = "Run akasha's checks over the whole tree as it stands"

import { relative } from "node:path"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import type { Check } from "../../../checks-system/check/check-shape.ts"
import { checksFound, checksOnAudit } from "../../../checks-system/checks.ts"
import { judgesAuthor, runAudit } from "../../../checks-system/run/audit.ts"

const AUDITED: readonly Check[] = checksFound()

const BY_DEFAULT: readonly Check[] = checksOnAudit()

const ROOT_SAID = "."

export const help = {
  description:
    "Run each named check over the whole akasha tree as it stands on disk, and print every file it fails with the reason it gave. Where no check is named, every check that can be audited is run. A check reached here need not be one the gate runs: the gate weighs a change, this weighs the state, and a check may be registered for one, the other or both. A check saying `check-on-audit: false` is left out where none is named and runs when named, which is how a check still being worked out is kept alive without its findings reaching anyone who did not ask. A check that judges its author is refused by name and set aside where none was named, an audit putting no act in front of it for it to weigh. A finding is printed and never refused: what an audit finds may want the code changed or the check changed, and only a reading tells which.",
  positionals: [
    {
      name: "slug",
      description: "A check to run, by slug. Repeatable. Every auditable check where none is named.",
      variadic: true,
    },
  ],
}

function slugsSaid(): string {
  return AUDITED.map((one) => one.slug).sort().join(", ")
}

function wantedFrom(argv: readonly string[]): readonly Check[] {
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length === 0) return BY_DEFAULT.filter((one) => !judgesAuthor(one))
  const wanted: Check[] = []
  for (const slug of named) {
    const found = AUDITED.find((one) => one.slug === slug)
    if (found === undefined) throw new Error(`no check is called \`${slug}\` — there is ${slugsSaid()}`)
    if (judgesAuthor(found)) {
      throw new Error(`\`${slug}\` judges its author, and an audit puts no act in front of it to weigh`)
    }
    wanted.push(found)
  }
  return wanted
}

export default async function audit(argv: readonly string[]): Promise<void> {
  const root = akashaRoot()
  const wanted = wantedFrom(argv)
  let found = 0
  for (const run of runAudit(wanted, root)) {
    if ("threw" in run) {
      console.log(`${run.slug}  threw  ${run.threw}`)
      continue
    }
    console.log(`${run.slug}  ${run.failures.length}`)
    const said = [...run.failures].sort((one, two) =>
      one.path === two.path ? (one.reason < two.reason ? -1 : 1) : one.path < two.path ? -1 : 1
    )
    for (const one of said) {
      const at = relative(root, one.path)
      console.log(`    ${at === "" ? ROOT_SAID : at}  ${one.reason}`)
    }
    found += run.failures.length
  }
  console.log("")
  console.log(`${found} failure(s) over ${wanted.length} check(s)`)
}
