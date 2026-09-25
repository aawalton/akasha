import { expect, test } from "bun:test"
import {
  besideThe,
  carriedOver,
  closureWithImages,
  clusterSeeds,
  heldBackIn,
  kindSeeds,
  narrowedTo,
  onwardOf,
  readingOver,
  styledFrom,
  testWrittenForAPage,
  typesWrittenForAPage,
  underFolder,
  webSeeds,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import type { ImageNamed } from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { readingNone } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const INDEX = shadowAt(codeRoot()).index

const PAGE = "apps/one/one.web-app.ts"

const TRACKED = [
  PAGE,
  "apps/one/main.ts",
  "apps/one/logo.png",
  "apps/two/two.web-app.ts",
  "shared/helper.ts",
  "shared/apart.ts",
  "shared/gone.ts",
]

const BODIES: Readonly<Record<string, string>> = {
  "apps/one/main.ts": 'import { help } from "akasha/shared/helper.ts"\nexport const one = help\n',
  "shared/helper.ts": 'import { far } from "akasha/shared/gone.ts"\nexport const help = far\n',
  "shared/gone.ts": "export const far = 1\n",
  "shared/apart.ts": "export const apart = 2\n",
  "apps/two/two.web-app.ts": "export const two = 3\n",
}

function bodyAt(path: string): string | null {
  return BODIES[path] ?? null
}

const SEEDS = besideThe(TRACKED, PAGE)

test("the files beside the page seed what a deploy is built from", () => {
  expect(SEEDS).toEqual([PAGE, "apps/one/main.ts", "apps/one/logo.png"])
})

test("a folder handed in answers the tracked files under that folder", () => {
  expect(underFolder(TRACKED, "shared")).toEqual([
    "shared/helper.ts",
    "shared/apart.ts",
    "shared/gone.ts",
  ])
})

test("a file beside the page that is no code is one the deploy is built from", () => {
  expect(readingOver(TRACKED, bodyAt, INDEX).over(SEEDS).has("apps/one/logo.png")).toBe(true)
})

test("a file the code beside the page imports is one the deploy is built from", () => {
  expect(readingOver(TRACKED, bodyAt, INDEX).over(SEEDS).has("shared/helper.ts")).toBe(true)
})

test("a file reached through another file reached is reached too", () => {
  expect(readingOver(TRACKED, bodyAt, INDEX).over(SEEDS).has("shared/gone.ts")).toBe(true)
})

test("a file nothing beside the page reaches is no file the deploy is built from", () => {
  const found = readingOver(TRACKED, bodyAt, INDEX).over(SEEDS)
  expect(found.has("shared/apart.ts")).toBe(false)
  expect(found.has("apps/two/two.web-app.ts")).toBe(false)
})

test("a path git does not track is reached by nothing", () => {
  const found = readingOver([PAGE, "apps/one/main.ts"], bodyAt, INDEX).over(SEEDS)
  expect(found.has("shared/helper.ts")).toBe(false)
})

test("a workstation service is seeded as well with the code its unit's command runs", () => {
  const found = kindSeeds(codeRoot(), "service-workstation")[0] ?? ""
  expect(found).toContain("service-running")
})

const PROXY_MANIFEST = "infrastructure/network/auth-proxy/manifests/auth-proxy-manifests.manifest"

test("a cluster service is seeded as well with its manifest and that manifest's code", () => {
  const found = clusterSeeds(codeRoot(), "auth-proxy")
  expect(found).toContain(`${PROXY_MANIFEST}.ts`)
  expect(found).toContain(`${PROXY_MANIFEST}.code.ts`)
})

const ATLAS_SERVICE =
  "infrastructure/service/akasha-service/service-cluster/pages/alanwalton-atlas/alanwalton-atlas.service-cluster"

test("a web app is seeded as well with its cluster service's page and the manifests file it states", () => {
  const found = webSeeds(codeRoot(), "alanwalton-atlas-web", [])
  expect(found).toContain(`${ATLAS_SERVICE}.ts`)
  expect(found).toContain(`${ATLAS_SERVICE}.manifests.yaml`)
})

test("a web app and a cluster service are seeded from the pages handed in", () => {
  const found = webSeeds(pagesAt(codeRoot(), "HEAD"), "alanwalton-atlas-web", [])
  expect(found).toContain(`${ATLAS_SERVICE}.manifests.yaml`)
  expect(webSeeds(readingNone(), "alanwalton-atlas-web", [])).toEqual([])
  expect(clusterSeeds(readingNone(), "auth-proxy")).toEqual([])
})

test("a cluster service its own reader refuses is seeded with nothing more", () => {
  expect(clusterSeeds(codeRoot(), "no-such-cluster-service")).toEqual([])
})

test("a kind whose unit names no shared code is seeded with nothing shared", () => {
  expect(kindSeeds(codeRoot(), "web-app")).toEqual([])
})

test("a body that is no TypeScript is read for no import", () => {
  const found = readingOver(TRACKED, () => BODIES["apps/one/main.ts"] ?? "", INDEX).over([
    "apps/one/logo.png",
  ])
  expect(found.has("shared/helper.ts")).toBe(false)
})

const CARRIED_TRACKED = [
  "apps/one/main.ts",
  "apps/one/main.test.ts",
  "apps/one/still.ts",
  "apps/one/still.test.ts",
  "shared/helper.ts",
  "shared/helper.test.ts",
  "apart/apart.ts",
  "apart/apart.test.ts",
]

const CARRIED_BUILT = new Set(["apps/one/main.ts", "apps/one/still.ts", "shared/helper.ts"])

test("a test beside a file being judged is carried, so the run that names it can read it", () => {
  const found = carriedOver(CARRIED_TRACKED, CARRIED_BUILT, ["apps/one/main.ts"])
  expect(found).toContain("apps/one/main.test.ts")
  expect(found).toContain("apps/one/still.test.ts")
})

test("a test in a folder holding nothing being judged is carried by nothing", () => {
  const found = carriedOver(CARRIED_TRACKED, CARRIED_BUILT, ["apps/one/main.ts"])
  expect(found).not.toContain("shared/helper.test.ts")
})

test("a file that is no test is carried for sitting in a folder the deploy is built from", () => {
  const found = carriedOver(CARRIED_TRACKED, CARRIED_BUILT, [])
  expect(found).toContain("shared/helper.ts")
  expect(found).toContain("apps/one/still.ts")
})

test("a file in a folder the deploy is built from nowhere is carried by nothing", () => {
  const found = carriedOver(CARRIED_TRACKED, CARRIED_BUILT, ["apps/one/main.ts"])
  expect(found).not.toContain("apart/apart.ts")
  expect(found).not.toContain("apart/apart.test.ts")
})

test("a test the deploy is built from is carried whatever folder that test sits in", () => {
  const built = new Set([...CARRIED_BUILT, "shared/helper.test.ts"])
  expect(carriedOver(CARRIED_TRACKED, built, [])).toContain("shared/helper.test.ts")
})

test("a test is named by the tail of the file holding it", () => {
  expect(testWrittenForAPage("apps/one/main.test.ts")).toBe(true)
  expect(testWrittenForAPage("apps/one/main.ts")).toBe(false)
})

const CLOSURES = new Map<string, ReadonlySet<string>>([
  ["one", new Set(["apps/one/main.ts"])],
  ["two", new Set(["apps/one/still.ts", "shared/helper.ts"])],
  ["three", new Set(["shared/helper.ts"])],
])

test("the closures narrow to the services named and to no others", () => {
  const found = narrowedTo(CLOSURES, new Set(["one", "three", "nowhere"]))
  expect([...found.keys()].sort()).toEqual(["one", "three"])
  expect(found.get("one")).toBe(CLOSURES.get("one") as ReadonlySet<string>)
})

test("closures narrowed to no service are built from nothing", () => {
  expect(narrowedTo(CLOSURES, new Set()).size).toBe(0)
})

test("a refusal holds back every service built from a file in the folder it names", () => {
  expect([...heldBackIn(CLOSURES, ["apps/one/main.test.ts"])].sort()).toEqual(["one", "two"])
})

test("a service built from nothing in that folder is held back by nothing", () => {
  expect([...heldBackIn(CLOSURES, ["shared/helper.test.ts"])].sort()).toEqual(["three", "two"])
})

test("a deploy nothing refused holds back no service", () => {
  expect(heldBackIn(CLOSURES, []).size).toBe(0)
})

test("a refusal naming what no service is built from holds back every service", () => {
  expect([...heldBackIn(CLOSURES, ["apart/apart.ts"])].sort()).toEqual(["one", "three", "two"])
})

const ADDON_PAGE = "addons/one/one.temper-addon.ts"

const ADDON_CODE = "addons/one/main.module.code.ts"

const ADDON_TYPES = "shared/one.temper-addon.types.ts"

const FAR = "shared/far.module.code.ts"

const NEAR = "shared/near.module.code.ts"

const ADDON_INDEX = "addons/one/one.temper-addon.referenced-by.jsonl"

const ADDON_TRACKED = [ADDON_PAGE, ADDON_CODE, ADDON_TYPES, ADDON_INDEX, FAR, NEAR]

const ADDON_BODIES: Readonly<Record<string, string>> = {
  [ADDON_PAGE]: `import type { One } from "akasha/${ADDON_TYPES}"\nexport const one: One = 1\n`,
  [ADDON_TYPES]: `import type { Far } from "akasha/${FAR}"\nexport type One = Far\n`,
  [ADDON_CODE]: `import { near } from "akasha/${NEAR}"\nexport const main = near\n`,
  [FAR]: "export type Far = number\n",
  [NEAR]: "export const near = 2\n",
}

function addonBodyAt(path: string): string | null {
  return ADDON_BODIES[path] ?? null
}

const ADDON_SEEDS = besideThe(ADDON_TRACKED, ADDON_PAGE)

function addonClosure(kind: "temper-addon" | "web-app"): ReadonlySet<string> {
  const onward = onwardOf(kind, codeRoot())
  return readingOver(ADDON_TRACKED, addonBodyAt, INDEX).over(ADDON_SEEDS, onward)
}

test("the types written for a page are named by the tail of the file holding them", () => {
  expect(typesWrittenForAPage(ADDON_TYPES)).toBe(true)
  expect(typesWrittenForAPage(ADDON_CODE)).toBe(false)
})

test("an addon is built from the code its own code reaches", () => {
  const found = addonClosure("temper-addon")
  expect(found.has(ADDON_CODE)).toBe(true)
  expect(found.has(NEAR)).toBe(true)
})

test("the types written for an addon's page are reached by that addon no longer", () => {
  const found = addonClosure("temper-addon")
  expect(found.has(ADDON_TYPES)).toBe(false)
  expect(found.has(FAR)).toBe(false)
})

test("the page beside the addon's code is built from all the same, being a seed", () => {
  expect(addonClosure("temper-addon").has(ADDON_PAGE)).toBe(true)
})

test("every other kind is built from the types written for its page as it was", () => {
  const found = addonClosure("web-app")
  expect(found.has(ADDON_TYPES)).toBe(true)
  expect(found.has(FAR)).toBe(true)
})

test("a file generated beside an addon's page seeds that addon no longer", () => {
  const found = addonClosure("temper-addon")
  expect(found.has(ADDON_INDEX)).toBe(false)
})

const STYLES: Readonly<Record<string, string>> = {
  "apps/one/look.css":
    '@import "tailwindcss";\n@import "akasha/shared/base.css";\n@import "../two/tone.css";\n',
}

test("a stylesheet reaches the stylesheets it imports by the repository's name or by path", () => {
  const found = styledFrom(["apps/one/look.css", "apps/one/main.ts"], (at) => STYLES[at] ?? null)
  expect(found).toEqual(["shared/base.css", "apps/two/tone.css"])
})

test("every other kind is seeded with the files generated beside its page as it was", () => {
  const found = addonClosure("web-app")
  expect(found.has(ADDON_INDEX)).toBe(true)
})

const MANIFEST = "svc/one/one.manifest.code.ts"

const IMAGE_PAGE = "images/one/one.built-image.ts"

const DOCKERFILE = "images/one/Dockerfile"

const RECIPE_PAGE = "recipes/pkg/image/pkg.container-recipe.ts"

const CONTAINERFILE = "recipes/pkg/image/Containerfile"

const IMAGED_TRACKED = [
  MANIFEST,
  IMAGE_PAGE,
  DOCKERFILE,
  "tsconfig.base.json",
  "package.json",
  "page/a.ts",
  "page/deep/b.ts",
  "pages-apart/c.ts",
  "made/x.ts",
  "shared/far.ts",
  RECIPE_PAGE,
  CONTAINERFILE,
  "recipes/pkg/server/server.py",
  "recipes/pkg/models.py",
  "server/server.py",
]

const IMAGED_BODIES: Readonly<Record<string, string>> = {
  [MANIFEST]: `import { one } from "akasha/${IMAGE_PAGE}"\nexport const ref = one\n`,
  [IMAGE_PAGE]: "export const one = 1\n",
  [DOCKERFILE]: [
    "FROM oven/bun AS build",
    "COPY --link tsconfig.base.json package.json ./",
    "COPY --link page ./page",
    "FROM oven/bun",
    "COPY --link --from=build made ./made",
    "",
  ].join("\n"),
  "page/a.ts": 'import { far } from "akasha/shared/far.ts"\nexport const a = far\n',
  "shared/far.ts": "export const far = 1\n",
  [CONTAINERFILE]: [
    "FROM python",
    "COPY server/server.py /app/server.py",
    "COPY models.py /app/models.py",
    "",
  ].join("\n"),
}

const IMAGES = new Map<string, ImageNamed>([
  [IMAGE_PAGE, { slug: "one", repository: "cluster/one", context: "", recipe: DOCKERFILE }],
  [
    RECIPE_PAGE,
    { slug: "pkg", repository: "cluster/pkg", context: "recipes/pkg", recipe: CONTAINERFILE },
  ],
])

function imaged(seeds: readonly string[]): ReadonlySet<string> {
  const reading = readingOver(IMAGED_TRACKED, (at) => IMAGED_BODIES[at] ?? null, INDEX)
  return closureWithImages(reading, seeds, IMAGES)
}

test("the paths a Dockerfile copies seed a deploy reaching the page of that image", () => {
  const found = imaged([MANIFEST])
  expect(found.has("tsconfig.base.json")).toBe(true)
  expect(found.has("package.json")).toBe(true)
})

test("a folder a copy names is taken as the tracked files under that folder", () => {
  const found = imaged([MANIFEST])
  expect(found.has("page/a.ts")).toBe(true)
  expect(found.has("page/deep/b.ts")).toBe(true)
  expect(found.has("pages-apart/c.ts")).toBe(false)
})

test("a file a Dockerfile copies is followed on through what that file imports", () => {
  expect(imaged([MANIFEST]).has("shared/far.ts")).toBe(true)
})

test("a path a stage copies out of an earlier stage seeds nothing", () => {
  expect(imaged([MANIFEST]).has("made/x.ts")).toBe(false)
})

test("the Dockerfile an image is built from is one the deploy is built from", () => {
  expect(imaged([MANIFEST]).has(DOCKERFILE)).toBe(true)
})

test("a container recipe's copies are read from the package that recipe is handed", () => {
  const found = imaged([RECIPE_PAGE])
  expect(found.has("recipes/pkg/server/server.py")).toBe(true)
  expect(found.has("recipes/pkg/models.py")).toBe(true)
  expect(found.has("server/server.py")).toBe(false)
})

test("a deploy reaching the page of no image is seeded by no copy", () => {
  const found = imaged(["shared/far.ts"])
  expect(found.has("tsconfig.base.json")).toBe(false)
  expect(found.has(DOCKERFILE)).toBe(false)
})
