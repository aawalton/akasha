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
    "What a seat states is written to both systems by one funnel, `writeSeatPage` and `removeSeatPage` in `tools/lib/seat-page.ts`, and the akasha page is composed from the same `Stated` the old one is. Nothing was backfilled: a seat writes its page as it works, so every seat an agent sat in carried itself over within the hour, under the id it already held. A seat nobody sits in is swept rather than carried, its page standing only while an agent is present in it.",
    "Tools run from source and nothing is built, so a change to a writer is live for every seat the moment it is saved. What the migration's write throws is caught where it is called: the old write is the one the fleet stands on until the readers move, and the new one cannot be allowed to take it down.",
    "What stands beside a seat has no funnel. Ten callers reach `patchUncommitted` directly rather than through `keepSeatRecord`, among them the proxy state writer, the supervisor heartbeat and the seat control loop, so one is built before a second destination is added rather than having the akasha write put in ten places and taken out of ten again. There is a lock chokepoint already, `exclusively` keyed on the file.",
    "What is observed of a seat is merged onto its page in akasha rather than kept anywhere of its own, so nothing observed can be written for a seat that does not stand there.",
    "A seat's uncommitted values are reached only through its committed page: `seatPageForAgent` maps an agent's id to a path by reading the `id:` frontmatter of every `agent/seat/*.seat.md`. Taking the old page away orphans the sidecar beside it even where the sidecar survives, so the id lookup answers from akasha before the old page goes. Two readers stop degrading quietly and throw when it does: `setControl` in `tools/lib/seat-control.ts`, and `waitForActionCleared` in `tools/lib/seat-action.ts` on a missing sidecar alone.",
    "A reader that cannot find a seat answers with nothing rather than refusing, all the way down through the id lookup, the page read and the value read. Once the readers move, that shape turns a mispointed root from an error into a fleet that reads as empty, so a moved reader refuses a root it finds no seat under.",
    "The generic page machinery reads seats without naming them. `filedPagesOf` walks the `files:` glob stated on the old page type, so the relation gate and four audits open every seat page with no literal `seat` at the call site. The sidecar beside a page is merged over the committed frontmatter whether or not the type declares it, so a key nothing declares still reaches every reader.",
    "The four turn keys are carried by nothing that runs, so they are left out rather than migrated and are rebuilt later. The six turn hooks are unregistered, `turn-end-decide` lost both its callers, and the `ops` CLI is refused by a hook and broken at its imports. Three of the four stand on no seat, and the fourth stands as `idle` on ten and is written once at launch. `errand` was the same and is gone.",
    "The akasha sidecar holds a plain value under a camelCase key rather than the old store's `{value, at}` pair, and nothing checks an uncommitted value against its property, so a writer that must honour a `max` checks it before writing. `keepLastMessagedAt` in `tools/lib/akasha-personas.ts` is that shape already.",
    "The old renderer addresses a seat's assignment against the tree the person pages have left, so it answers a bare name where it once answered `person/alan`, and rewrites its own stored value on the next write. The akasha renderer asks akasha first and falls back to that lookup only for `global`, `agent-harness` and `technology`, which have yet to move. The old one is left drifting; it goes when the writers stop writing outside akasha.",
  ],
} as const satisfies Initiative
