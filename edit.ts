import { readFileSync, writeFileSync } from "node:fs"

const ROOT = "/var/home/walton/repos/akasha/"
const S =
  "/tmp/claude-1000/-var-home-walton-repos/69461732-1d69-48f9-8a42-f70b0f7f49da/scratchpad/stage/"

function edit(rel: string, out: string, pairs: [string, string][]) {
  let text = readFileSync(ROOT + rel, "utf8")
  for (const [from, to] of pairs) {
    const n = text.split(from).length - 1
    if (n !== 1) throw new Error(`${rel}: ${n} matches for ${JSON.stringify(from.slice(0, 60))}`)
    text = text.replace(from, to)
  }
  writeFileSync(S + out, text)
  console.log(`ok ${rel} -> ${out}`)
}

edit("akasha/pages-system/page-types/page-type.page-type.ts", "page-type.page-type.ts", [
  [
    `import type { ExtendsSlug } from "./properties/extends-slug.relation-property.ts"`,
    `import type { DetailConfig } from "./properties/detail-config.record-property.ts"\nimport type { ExtendsSlug } from "./properties/extends-slug.relation-property.ts"`,
  ],
  [`  mediaConfig?: MediaConfig\n`, `  detailConfig?: DetailConfig\n  mediaConfig?: MediaConfig\n`],
  [
    `    "boolean-property/many",\n    "boolean-property/mortal",\n    "boolean-property/required",\n    "boolean-property/runs-taboo-check",\n    "boolean-property/secret",\n    "boolean-property/uncommitted",\n    "record-property/audio-media",\n    "record-property/image-media",\n    "record-property/media-config",\n    "record-property/properties",\n    "record-property/sequence",\n    "relation-property/extends-slug",\n    "relation-property/loaded-by-slug",\n    "relation-property/page-property-slug",\n    "text-property/default-value",\n    "text-property/media-renderer",\n    "text-property/media-source-property-id",\n    "text-property/media-variant-axis",\n    "text-property/sequence-direction",\n    "text-property/sequence-group-by",\n    "text-property/sequence-order-by",\n`,
    `    "boolean-property/frame-edge-to-edge",\n    "boolean-property/frame-focus-mode",\n    "boolean-property/full-bleed",\n    "boolean-property/header-show-cover",\n    "boolean-property/many",\n    "boolean-property/mark-read-on-end",\n    "boolean-property/mortal",\n    "boolean-property/required",\n    "boolean-property/runs-taboo-check",\n    "boolean-property/secret",\n    "boolean-property/show-reading-progress",\n    "boolean-property/uncommitted",\n    "record-property/audio-media",\n    "record-property/child-collection",\n    "record-property/collection-header",\n    "record-property/detail-config",\n    "record-property/detail-frame",\n    "record-property/frame-auto-scroll",\n    "record-property/image-media",\n    "record-property/media-config",\n    "record-property/properties",\n    "record-property/sequence",\n    "relation-property/child-type",\n    "relation-property/extends-slug",\n    "relation-property/loaded-by-slug",\n    "relation-property/page-property-slug",\n    "text-property/body-property-id",\n    "text-property/child-relation",\n    "text-property/default-value",\n    "text-property/detail-display",\n    "text-property/header-fields",\n    "text-property/length-property-id",\n    "text-property/load-scroll",\n    "text-property/media-renderer",\n    "text-property/media-source-property-id",\n    "text-property/media-variant-axis",\n    "text-property/progress-property-id",\n    "text-property/sequence-direction",\n    "text-property/sequence-group-by",\n    "text-property/sequence-order-by",\n`,
  ],
  [
    `    { pagePropertySlug: "media-config", required: false, many: false },\n`,
    `    { pagePropertySlug: "detail-config", required: false, many: false },\n    { pagePropertySlug: "media-config", required: false, many: false },\n`,
  ],
  [
    `    {\n      invariantKind: "departure",\n      statement: "A page type says here whether its pages are rendered as audio or as an image.",\n    },\n`,
    `    {\n      invariantKind: "departure",\n      statement: "A page type says here how one of its pages stands on a screen of its own.",\n    },\n    {\n      invariantKind: "departure",\n      statement: "A page type says here whether its pages are rendered as audio or as an image.",\n    },\n`,
  ],
])

edit("akasha/alan/chess/chess-games/chess-game.page-type.ts", "chess-game.page-type.ts", [
  [
    `  extendsSlug: "page-type/page",\n  runsTabooCheck: false,\n`,
    `  extendsSlug: "page-type/page",\n  runsTabooCheck: false,\n  detailConfig: {\n    display: "chess-review",\n  },\n`,
  ],
])

edit("akasha/games/games/game.page-type.ts", "game.page-type.ts", [
  [
    `  extendsSlug: "page-type/collection",\n  partSlugs: [\n`,
    `  extendsSlug: "page-type/collection",\n  detailConfig: {\n    display: "game",\n  },\n  partSlugs: [\n`,
  ],
])

edit("akasha/games/idle-games/idle-game.page-type.ts", "idle-game.page-type.ts", [
  [
    `  extendsSlug: "page-type/collection",\n  partSlugs: [`,
    `  extendsSlug: "page-type/collection",\n  detailConfig: {\n    display: "game",\n  },\n  partSlugs: [`,
  ],
])

edit("akasha/persona-system/personas/persona.page-type.ts", "persona.page-type.ts", [
  [
    `  extendsSlug: "page-type/domain",\n  partSlugs: [\n`,
    `  extendsSlug: "page-type/domain",\n  detailConfig: {\n    display: "persona",\n    frame: {\n      autoScroll: {\n        loadScroll: "end",\n      },\n    },\n  },\n  partSlugs: [\n`,
  ],
])

edit("akasha/story/stories-read/story-read.page-type.ts", "story-read.page-type.ts", [
  [
    `  extendsSlug: "page-type/collection-external",\n  runsTabooCheck: false,\n`,
    `  extendsSlug: "page-type/collection-external",\n  runsTabooCheck: false,\n  detailConfig: {\n    display: "collection",\n    header: {\n      showCover: true,\n      fields: [],\n    },\n    childCollection: {\n      childType: "story-chapter-read",\n      childRelation: "partOfSlugs",\n    },\n  },\n`,
  ],
])

edit(
  "akasha/story/story-chapters-read/story-chapter-read.page-type.ts",
  "story-chapter-read.page-type.ts",
  [
    [
      `  extendsSlug: "page-type/collection-external",\n  runsTabooCheck: false,\n`,
      `  extendsSlug: "page-type/collection-external",\n  runsTabooCheck: false,\n  detailConfig: {\n    display: "reader",\n    frame: {\n      edgeToEdge: true,\n      focusMode: true,\n      autoScroll: {\n        loadScroll: "progress",\n      },\n    },\n    bodyPropertyId: "prose",\n    fullBleed: true,\n    showReadingProgress: true,\n    markReadOnEnd: true,\n    progressPropertyId: "ownProgress",\n    lengthPropertyId: "ownLength",\n  },\n  mediaConfig: {\n    audio: {\n      sourcePropertyId: "prose",\n      renderer: "tts",\n      variantAxis: "narrator",\n    },\n    image: {\n      renderer: "z-image-turbo",\n    },\n  },\n  sequence: {\n    groupBy: "partOfSlugs",\n    orderBy: "position",\n    direction: "asc",\n  },\n`,
    ],
  ]
)
