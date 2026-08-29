import type { Finding } from "../finding.page-type.ts"

export const moveRepointsOutboundOnly = {
  id: "01a04bf5-74d0-72b2-8e6e-b7535bc125c5",
  pageTypeSlug: "finding",
  slug: "move-repoints-outbound-only",
  domainSlug: "domain/command-system",
  claim:
    "A move repoints what the moved body names and cannot repoint the files that name the moved body, because the index carries no edge from a file to the files importing it.",
  evidence:
    "The indexer builds relation entries by walking a page value's own properties and asking the schema index what each property targets, so the property slugs actually filed under relation across the whole repository are domain-slug, entry-slug, extends-slug, part-slugs and target-page-type-slug. No module specifier in any body is ever parsed, so who imports a given path is not answerable from the index at any cost. Outbound repointing is sound and done: the moved body's own relative specifiers are re-resolved against its new directory, package specifiers untouched. One inbound class is closed by refusal rather than by repair, since a move that would change a basename would change the page's slug, and move refuses that outright and names from the reverse index who would dangle. What has changed is the backstop. Typecheck now compiles the folder as the change would leave it, and a path the change takes away is not there for the compiler, so a `.ts` file still importing the old path is refused with TS2307 at the gate. The gap left is narrower than it was: a move of a file that is not TypeScript, an importer outside `akasha/`, and any call carrying `--break-the-glass`. Move still reports the gap in every answer rather than blocking, which is now more caution than the common case needs. Recorded because closing it properly is a choice between teaching the indexer to file an import edge and letting move parse the corpus for importers, which the scope rule forbids today.",
} as const satisfies Finding
