import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "akasha",
  intents: [
    {
      statement: "Each page address kind holds the code that finds its page.",
      workingMemory:
        "`page-address-kind` extends `page-type/module`, as `folder-shape`, `name-format`, `syntax-rule`, `code-check`, `command`, `agent-hook` and `index` do. The address module dispatches and holds the union, so a kind missing its resolver fails to compile rather than falling into another kind's else. `reaching.module.code.ts:1` and `index-reading.module.code.ts:2` import `addressIn` today, so the parse leaves the index before the resolver enters the module.",
    },
    {
      statement: "Every relation value in akasha is a page address of one of the three kinds.",
      workingMemory:
        "27651 entries over 26133 pages: 21756 bare across 510 values, 5895 qualified, 0 dangling. The declaring property's target page type settles every ambiguous value but `profile`. Count by parsing arrays, not lines: 16 values sit only in multi-entry arrays. Beyond relations, 2563 of the 2601 `pagePropertySlug` values are bare, and `shapedIn`'s search across page types answers them; `4eb997e9` took it out and emptied 443 of 453 page types, unfiling all 914 unique keys in silence. It goes last.",
    },
    {
      statement: "A page unique only within its parent declares `unique: part-of`.",
      workingMemory:
        "No live property declares the reach. `scopesFor` handles it and `partingIn`/`partingOver` compute a page's parents, but no scope folder is on disk. `a-new-unique-property-costs-the-gate-minutes` measured 578s and 1803s of CPU for one new key, killed unfinished, against 13607 `story-chapter-read` pages. A part-of scope is a parent slug alone, and 81 of those name both a `world` and a `story-read`, so a parent is named by an address rather than a value.",
    },
    {
      statement: "No relation value lands that akasha cannot key to one page.",
      workingMemory:
        "`identifier-names-one-page` is the only guard, and it runs on a patch alone: `runsOnWorktree`, `runsOnDeploy` and `runsOnAudit` are all false. `akasha replace` and `akasha remove` land as `change-mechanical` and are judged by no check at all, which is the path a bulk migration takes. Measured clean today: no second line in any of the 70040 id files, nor in any file under a `slug` key.",
    },
    {
      statement: "No relation property's name ends in `slug`.",
      workingMemory:
        "121 relation properties, and 90 are named `<x>-slug` or `<x>-slugs`. The types say it too: `PartOfSlugs = List<Slug>`. Every one of those names goes false as its value becomes an address. One property at a time rather than one landing: a mechanical change is judged by no check, and `akasha replace` is the only tool at this scale. `page-type-slug` and `part-of-slugs` reach the most pages, so they go last, once a small one has shown what the rename costs.",
    },
    {
      statement: "Every folder in akasha has a shape allowed by folder-matches-a-shape.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape` answers 961 refusals over 120410 files, and one answer holds what fits in 28000 bytes, so the list is worked lex-ordered in tranches. That narrowed run costs 1.5 GB and 12 seconds, and adding `--file-path` brings it to 0.6 GB and 3 seconds, so a fix is measured where it lands rather than batched. A whole audit is the run that costs 21 GB and eight minutes.",
    },
    {
      statement: "Every shape allowed by folder-matches-a-shape is clean and approved by Alan.",
      workingMemory:
        "`HELD_FOLDERS` is `modules`, `pages`, `properties` and `scripts`; a parent shape skips a subfolder carrying one of those names and leaves it to that folder's own shape. `modules-only` reads what the page above declares. `scripts-only`, `pages-of-one-type`, `pages-of-the-type-above`, `properties-of-the-type-above` and `property-pages-only` call `declared()` nowhere, so nothing asks whose parts those folders hold.",
    },
    {
      statement: "A check determines whether a folder should be a workspace package.",
      workingMemory:
        "Nothing states this today, so it is decided case by case. Alan's default: a folder unless there is a reason to make it a package, and a reason is a name the outside must reach. `agents` earns its manifest, reached by 18 subpaths from 37 import sites across `seat-system` and `command-system`. The workspace-package page already carries the rule Earn The Manifest.",
    },
  ],
} as const satisfies Initiative
