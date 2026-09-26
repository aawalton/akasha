import { expect, test } from "bun:test"
import {
  assembleWorldTree,
  type Paged,
} from "akasha/alan/harness/code-editor/data-interface/modules/world-tree-assemble/world-tree-assemble.module.code.ts"

const HYRULE: Paged = {
  pageTypeSlug: "world",
  at: "/repo/story/world/pages/hyrule/hyrule.world.ts",
  value: { id: "01a00000-0000-7000-8000-00000000aaaa", slug: "hyrule", title: "Hyrule" },
}

const AZEROTH: Paged = {
  pageTypeSlug: "world",
  at: null,
  value: { id: "01a00000-0000-7000-8000-00000000bbbb", slug: "azeroth", title: "Azeroth" },
}

function storyOf(slug: string, title: string, world: Paged): Paged {
  return {
    pageTypeSlug: "story-played",
    at: null,
    value: {
      id: `01a00000-0000-7000-8000-0000${slug.padEnd(8, "0").slice(0, 8)}`,
      slug,
      title,
      world: [world.pageTypeSlug, world.value.slug].join("/"),
    },
  }
}

const NOWHERE: Paged = { pageTypeSlug: "world", at: null, value: { slug: "nowhere" } }

test("one top row holds every world, ordered by title", () => {
  const tree = assembleWorldTree([HYRULE, AZEROTH], [])
  expect(tree.roots.map((row) => row.label)).toEqual(["worlds"])
  expect(tree.roots[0]?.children.map((row) => row.label)).toEqual(["Azeroth", "Hyrule"])
})

test("a story hangs under the world it names, ordered by title", () => {
  const tree = assembleWorldTree(
    [HYRULE],
    [storyOf("totk", "Tears of the Kingdom", HYRULE), storyOf("botw", "Breath of the Wild", HYRULE)]
  )
  expect(tree.roots[0]?.children[0]?.children.map((row) => row.label)).toEqual([
    "Breath of the Wild",
    "Tears of the Kingdom",
  ])
})

test("a row opens its page on the site", () => {
  const tree = assembleWorldTree([HYRULE], [storyOf("botw", "Breath of the Wild", HYRULE)])
  const world = tree.roots[0]?.children[0]
  expect(tree.roots[0]?.url).toBe("https://alanwalton.com/world")
  expect(world?.url).toBe("https://alanwalton.com/world/hyrule-0000aaaa")
  expect(world?.children[0]?.url).toBe("https://alanwalton.com/story-played/botw-botw0000")
  expect(world?.at).toBe("/repo/story/world/pages/hyrule/hyrule.world.ts")
})

test("a story naming no world drawn is left out and named as unreached", () => {
  const tree = assembleWorldTree([HYRULE], [storyOf("lost", "Lost", NOWHERE)])
  expect(tree.roots[0]?.children[0]?.children).toEqual([])
  expect(tree.unreached).toEqual(["Lost"])
})
