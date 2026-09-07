import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "akasha",
  intents: [
    {
      statement: "A reach is `always` or `page-type`.",
      workingMemory:
        "`page` is out of `Unique` and out of the identity invariant, so the reach `part-of` alone is left. `book-section` declares it on `slug`, and that is the one live declarer — I had this wrong before counting. Its 455 pages each name exactly one parent through the collections dag, so the reach goes once that page type carries a `uniqueScope`. Deleting the `part-of` unique kind moves no index entry.",
    },
    {
      statement: "A page unique only within a scope declares `uniqueScope`.",
      workingMemory:
        "`uniqueScope` is a property now, statable on a property page and inside a declaration. Threading it into the shape the index files is refused: `index-entries.module.code.ts` is over its ceiling, so that shape gains no field until the module is divided. Touching `index-reading` and `declared-properties` runs their latent refusals too — prose comments, `noShadow` thrice, and `named` restating `asStringOrNull` in 7 files. A length refusal makes a file read unedited, so its type errors are one.",
    },
    {
      statement: "The identity index files each page under the level its reach names.",
      workingMemory:
        "`filedIn` answers `{ scope, propertySlug, said }` and `identityIn` joins `identity/{scope}/{propertySlug}/{said}.jsonl`, so there is no level segment and the universal scope `page` shares a directory with the page type named `page`. `scopesFor` sends `part-of` to the parent slugs `partOf(value)` answers. The three levels each add one scope, and the writer's triple gains the level and the scope property.",
    },
    {
      statement: "Each page address kind holds the code that finds its page.",
      workingMemory:
        "The three kinds are pages with a type and a recogniser, and the module holds the union, so a kind missing from it fails to compile. None holds a resolver. `reaches` at `reaching.module.code.ts:216` finds every page, switching on `addressIn`'s four arms — id, qualified, scoped, bare — told apart by counting slashes, lining up with no kind. `addressedIn` refuses a bare address that `reaches` resolves. A kind's resolver composes the identity path off the address and reads one file.",
    },
    {
      statement: "Every relation value in akasha is a page address of one of the three kinds.",
      workingMemory:
        "27651 entries over 26133 pages: 21756 bare across 510 values, 5895 qualified, 0 dangling. The declaring property's target page type settles every ambiguous value but `profile`. Count by parsing arrays, not lines: 16 values sit only in multi-entry arrays. Beyond relations, 2563 of the 2601 `pagePropertySlug` values are bare, and `shapedIn`'s search across page types answers them; `4eb997e9` took it out and emptied 443 of 453 page types, unfiling all 914 unique keys in silence. It goes last.",
    },
    {
      statement: "The collections edge is named `partOfCollectionSlugs`.",
      workingMemory:
        "25744 children name a parent through `partOfSlugs` and 11138 pages are named as a part through `partSlugs`; `partingIn` reads both directions into one parent map. `partSlugs` keeps its name and stays the domain spanning tree. 1066 children name several parents, 1055 of them `great-course`, and that dag is the collections edge rather than a fault to mend.",
    },
    {
      statement: "A story chapter names its story with one property of its own.",
      workingMemory:
        "All 13607 chapters name exactly one parent today, so nothing is lost by binding one. A chapter's slug carries the story name as a prefix, which `story.domain.ts` holds as an invariant, and that invariant goes once the scope binds. `sequence` groups on `partOfSlugs` and retargets to the new property. The collections edge stays beside it, carrying a different fact.",
    },
    {
      statement: "No relation value lands that akasha cannot key to one page.",
      workingMemory:
        "`identifier-names-one-page` is the only guard, and it runs on a patch alone: `runsOnWorktree`, `runsOnDeploy` and `runsOnAudit` are all false. A mechanical change is judged by no check at all, which is the path a bulk migration takes. Measured clean today: no second line in any of the 70040 id files, nor in any file under a `slug` key.",
    },
    {
      statement: "No relation property's name ends in `slug`.",
      workingMemory:
        "121 relation properties, and 90 are named `<x>-slug` or `<x>-slugs`. The types say it too: `PartOfSlugs = List<Slug>`. Every one of those names goes false as its value becomes an address. One property at a time rather than one landing: a mechanical change is judged by no check. `page-type-slug` and `part-of-slugs` reach the most pages, so they go last, once a small one has shown what the rename costs.",
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
  constraints: [
    "A page address is a structured value rather than a string.",
    "An address carries what its index path needs, so a lookup composes that path and reads one file.",
    "The identity index files under a level — `page`, `page-type` or `page-property` — then a scope, then a property, then a value.",
    "A property declaration names its scoping property under `uniqueScope`.",
    "A page-property path names the page type, then the scope property and its value, then the unique property and its value.",
    "A property `uniqueScope` names is declared on the same page type, is required, and carries one value.",
    "A reach is `always` or `page-type`, and `uniqueScope` narrows `page-type`.",
    "`partSlugs` keeps its name, and the collections edge becomes `partOfCollectionSlugs`.",
  ],
} as const satisfies Initiative
