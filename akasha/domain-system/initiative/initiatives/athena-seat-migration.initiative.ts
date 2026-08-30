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
      statement:
        "What a seat states and what is observed of it are each declared in akasha, settled one property at a time against the seats standing today.",
    },
    {
      invariantKind: "gap",
      statement: "Every writer of a seat writes it to both systems.",
    },
    {
      invariantKind: "gap",
      statement: "Every seat stands in akasha under the id it already carries.",
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
      statement: "No seat, and nothing beside a seat, stands outside akasha.",
    },
  ],
  notes: [
    "Every reader and writer of a seat stands in this repository, so the set is closed by reading it rather than reasoned about. The one path that could reach a seat from outside is the HTTP write layer in `shared/pages-query`, which posts to a page query service; no such service runs, no definition of one stands outside a stale build artifact under `infra/k8s/dist`, and it is to be stopped rather than written to. A caller outside `akasha/` reads the new system by importing its read functions from the folder. The dependency runs one way by construction: an akasha file imports nothing tracked from outside, and the `imports-inside` check refuses one that tries.",
    "A seat's id carries over unchanged. The reading record under `.git/data/reads` is keyed by it, and the gate refuses a body whose writer has no record of reading it, so a migration that reissues a seat's id costs that seat the ability to write at all.",
    "The committed page has one funnel: `writeSeatPage` and `removeSeatPage` in `tools/lib/seat-page.ts`. What stands beside it does not. There is a lock chokepoint, `exclusively` keyed on the file, but about a dozen callers reach `patchUncommitted` directly rather than through `keepSeatRecord`, among them the proxy state writer, the supervisor heartbeat, the seat control loop and every turn hook. One writer stands outside the committed funnel altogether: `tools/tests/seat-fixture.ts` composes a seat page by hand and writes it with a raw `writeFileSync`.",
    "A reader that cannot find a seat answers with nothing rather than refusing, all the way down through the id lookup, the page read and the value read. Once the readers move, that shape turns a mispointed root from an error into a fleet that reads as empty, so a moved reader refuses a root it finds no seat under.",
    "The generic page machinery reads seats without naming them. `filedPagesOf` walks the `files:` glob stated on the old page type, so the relation gate and four audits open every seat page with no literal `seat` at the call site. The sidecar beside a page is merged over the committed frontmatter whether or not the type declares it, so a key nothing declares still reaches every reader.",
  ],
} as const satisfies Initiative
