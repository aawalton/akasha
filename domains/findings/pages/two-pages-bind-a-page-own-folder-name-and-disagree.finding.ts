import type { Finding } from "../finding.page-type.ts"

export const twoPagesBindAPageOwnFolderNameAndDisagree = {
  id: "01a0735a-93ec-79a2-bdfc-73a705428d8c",
  pageTypeSlug: "finding",
  slug: "two-pages-bind-a-page-own-folder-name-and-disagree",
  domainSlug: "code-check/folder-matches-a-shape",
  claim:
    "A page whose slug opens with the slug of the page type above it sits in no folder that passes `folder-matches-a-shape`, because the folder shape page type gives that folder the page's own slug while the check refuses a folder opening with the name above it.",
  evidence:
    "`folder-shape.page-type.ts` states `A folder holding one page answers with the name that page gives its folder` and `A page stating no plural slug gives its folder its slug`. `folder-matches-a-shape.code-check.ts` states `A folder's name never opens with the slug of the page above that folder`, `A folder opening with that name is refused whatever shape the folder would match`, and `That refusal is answered before any shape is asked`. Two folders meet both. `story/worlds/pages/world-tree-trilogy` holds the one page `world-tree-trilogy.world.ts` and answers `this folder opens with world, what the page above it is named`, the page above being `world.page-type.ts` reached through `pages`. `story/gm-doctrine-packs/pages/gm-doctrine-pack` answers the same. Neither folder can be renamed, because the shape reads the name off the page. I reached both by moving each page into a folder of its own, which the shapes force wherever one page in a folder carries a file beside it: `story/worlds/pages` holds 151 pages and only `the-wandering-inn` carries files, and `pages-of-the-type-above` states both `pages carry a file beside them, and each belongs in a folder of its own` and `it holds page files alone or page folders alone`. I did not establish which rule is meant to yield, and did not test a slug opening with the plural slug.",
} as const satisfies Finding
