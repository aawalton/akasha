import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const moveRepointsOutboundOnly = {
  id: "01a04bf5-74d0-72b2-8e6e-b7535bc125c5",
  pageTypeSlug: "finding",
  slug: "move-repoints-outbound-only",
  domainSlug: "domain/command-system",
  claim:
    "A move repoints what the moved body names and cannot repoint the files that name the moved body, because the index carries no edge from a file to the files importing it.",
  evidence:
    "The indexer builds relation entries by walking a page value's own properties and resolving each named slug, so the only property slugs filed under relation across the whole repository are domain-slug, entry-slug, extends-slug, part-slugs, required-reading-slugs and target-page-type-slug. No module specifier in any body is ever parsed, so who imports a given path is not answerable from the index at any cost. Outbound repointing is sound and done: the moved body's own relative specifiers are re-resolved against its new directory, package specifiers untouched. One inbound class is closed by refusal rather than by repair, since a move that would change a basename would change the page's slug, and move refuses that outright and names from the reverse index who would dangle. That leaves inbound relative imports as the gap, and the gate is not a backstop for it, typecheck reading disk rather than the change. Blocking would refuse every move of every file under the folder, so it reports the gap in every answer instead. Recorded because closing it is a choice between teaching the indexer to file an import edge and letting move parse the corpus for importers, which the scope rule forbids today.",
} as const satisfies Finding
