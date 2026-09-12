import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandFolders = {
  id: "01a09279-d28b-7685-a730-7779118b7cc2",
  type: "initiative",
  slug: "athena-command-folders",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "A parts list is sorted, and no reader depends on the order it is written in.",
      workingMemory:
        "The namespace listing is settled: `namespace-listing.module.code.ts` sorts by the listed name, stated on its page. `code-check/parts-list-is-sorted` landed `experimental: true`; it sorts by whole `type/slug`, refusing 350 pages where slug alone refuses 517. Those 350 are exactly the pages whose Domains numbering moves, read only by `ordered` at `champions-tree.module.code.ts:27`, so no sweep starts yet. Alan's, one word: `record` (`{part, place}`), `number` (a `place` per child), or `none`?\n",
    },
  ],
} as const satisfies Initiative
