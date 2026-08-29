import type { Judged } from "../../../write-system/landing.module.code.ts"
import type { Whole } from "../../checking.module.code.ts"
import { corpusFor } from "../../checking.module.code.ts"
import { claimsIn } from "../../page-claims.module.code.ts"

function reasonFor(said: string, named: string, bytes: Uint8Array | null): string | null {
  if (bytes === null) {
    return (
      `${said}, and nothing is at \`${named}\` — a page property of kind file is held in a ` +
      "file beside its page, named for its page and for the property it holds"
    )
  }
  if (bytes.byteLength > 0) return null
  return (
    `${said}, and \`${named}\` is empty — a property's file is where that property's value is ` +
    "held, so a page stating one and holding nothing states nothing"
  )
}

export function pagePropertyHasItsFile(given: Whole): readonly Judged[] {
  const read = corpusFor(given)
  if (read.kind === "unread") return [{ path: given.root, reason: read.reason }]
  const stood = new Set(given.paths)
  const said: Judged[] = []
  for (const claim of claimsIn(read.corpus)) {
    const at = read.back(claim.page.path)
    const beside = read.back(claim.path)
    const bytes = stood.has(beside) ? given.at(beside) : null
    const named = beside.startsWith(`${given.root}/`) ? beside.slice(given.root.length + 1) : beside
    const reason = reasonFor(
      `\`${claim.page.slug}\` states \`${claim.held.slug}\` as \`${claim.stated}\``,
      named,
      bytes
    )
    if (reason !== null) said.push({ path: at, reason })
  }
  return said
}
