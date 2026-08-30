import type { Initiative } from "../initiative.page-type.ts"

export const athenaSeatMigration = {
  id: "01a0536a-1d25-72cd-a5d8-617864bb7013",
  pageTypeSlug: "initiative",
  slug: "athena-seat-migration",
  domainSlug: "domain/seat-system",
  personaSlug: "athena",
  parentSlug: "akasha-seats",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every writer of what a seat states writes it to both systems.",
    },
    {
      invariantKind: "gap",
      statement: "Every seat stands in akasha under the id it already carries.",
    },
    {
      invariantKind: "gap",
      statement: "Every writer of what is observed of a seat writes it to both systems.",
    },
    {
      invariantKind: "gap",
      statement: "Every reader of a seat reads it from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "No writer of a seat writes it outside akasha.",
    },
    {
      invariantKind: "gap",
      statement: "No seat and nothing beside a seat stand outside akasha.",
    },
  ],
  notes: [
    "Every reader and writer of a seat stands in this repository, so the set is closed by reading it rather than reasoned about. The one path that could reach a seat from outside is the HTTP write layer in `shared/pages-query`, which posts to a page query service; no such service runs, no definition of one stands outside a stale build artifact under `infra/k8s/dist`, and it is to be stopped rather than written to. A caller outside `akasha/` reads the new system by importing its read functions from the folder. The dependency runs one way by construction: an akasha file imports nothing tracked from outside, and the `imports-inside` check refuses one that tries.",
    "A seat's id carries over unchanged. The reading record under `.git/data/reads` is keyed by it, and the gate refuses a body whose writer has no record of reading it, so a migration that reissues a seat's id costs that seat the ability to write at all.",
    "The committed page has one funnel: `writeSeatPage` and `removeSeatPage` in `tools/lib/seat-page.ts`, and nothing composes a seat page outside it. What stands beside it has no such funnel. There is a lock chokepoint, `exclusively` keyed on the file, but ten callers reach `patchUncommitted` directly rather than through `keepSeatRecord`, among them the proxy state writer, the supervisor heartbeat and the seat control loop.",
    "What is observed of a seat is merged onto its page in akasha rather than kept anywhere of its own, so nothing observed can be written until the seat stands there and the backfill comes before that half of the dual write. The half a seat states moves first: it has the funnel already, and it is the smallest change that proves a program can write a page instance into akasha at all, which none has yet done. The observed half gets a funnel of its own before it gets a second destination, rather than having the akasha write added in ten places and taken out of ten again.",
    "A seat's uncommitted values are reached only through its committed page: `seatPageForAgent` maps an agent's id to a path by reading the `id:` frontmatter of every `agent/seat/*.seat.md`. Taking the old page away orphans the sidecar beside it even where the sidecar survives, so the id lookup answers from akasha before the old page goes. Two readers stop degrading quietly and throw when it does: `setControl` in `tools/lib/seat-control.ts`, and `waitForActionCleared` in `tools/lib/seat-action.ts` on a missing sidecar alone.",
    "A reader that cannot find a seat answers with nothing rather than refusing, all the way down through the id lookup, the page read and the value read. Once the readers move, that shape turns a mispointed root from an error into a fleet that reads as empty, so a moved reader refuses a root it finds no seat under.",
    "The generic page machinery reads seats without naming them. `filedPagesOf` walks the `files:` glob stated on the old page type, so the relation gate and four audits open every seat page with no literal `seat` at the call site. The sidecar beside a page is merged over the committed frontmatter whether or not the type declares it, so a key nothing declares still reaches every reader.",
    "The four turn keys are carried by nothing that runs, so they are left out rather than migrated and are rebuilt later. The six turn hooks are unregistered, `turn-end-decide` lost both its callers, and the `ops` CLI is refused by a hook and broken at its imports. Three of the four stand on no seat, and the fourth stands as `idle` on ten and is written once at launch. `errand` was the same and is gone.",
    "The akasha sidecar holds a plain value under a camelCase key rather than the old store's `{value, at}` pair, and nothing checks an uncommitted value against its property, so a writer that must honour a `max` checks it before writing. `keepLastMessagedAt` in `tools/lib/akasha-personas.ts` is that shape already.",
  ],
} as const satisfies Initiative
