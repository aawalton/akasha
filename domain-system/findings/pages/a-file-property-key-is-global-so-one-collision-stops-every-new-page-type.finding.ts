import type { Finding } from "../finding.page-type.ts"

export const aFilePropertyKeyIsGlobalSoOneCollisionStopsEveryNewPageType = {
  id: "01a06854-7194-703c-9f34-88a9894c5761",
  pageTypeSlug: "finding",
  slug: "a-file-property-key-is-global-so-one-collision-stops-every-new-page-type",
  domainSlug: "domain/akasha",
  claim:
    "The index keys file properties by their key alone, with no page type beside it, so `alert-description` claiming the key `description` makes the index treat every `description` on every page type as a file held beside that page. The value it then reads as a file extension is prose. The rebuild dies on it, and until the rebuild runs a page type a change adds is invisible to the checks, so nothing can name that page type as a part and no page of it resolves.",
  evidence:
    "`akasha index refresh --unlanded` throws ENAMETOOLONG making a directory named `aelwyn-l01-20260705t165824z.persona-wallpaper.description.A high forested mountain-v...`. That text is the `description` on line 15 of the persona-wallpaper page of the same name, a `text-property/description`. `filePropertiesIn` and `filePropertiesAt` key on `propertySlug` alone; `pathsOf` then looks up the page's own key in that map and appends the value as an extension. `alert-description.file-property.ts` carries id 01a06755, minted after the last page type that landed judged, game-design-drive at 01a06746. Landing a new page type was probed four ways after that: by qualified slug, by id, under a second slug, and with the parent edge in the same commit and in a later one. Every probe refused with the same pair, and every other check passed. Two ways out: key file properties by page type and key together, or move the alert off `description`, which reaches its 61 sidecar files.",
} as const satisfies Finding
