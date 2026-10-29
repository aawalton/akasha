import { describe, expect, test } from "bun:test"
import {
  dayNow,
  MANIFEST,
  watched,
  writeOf,
} from "akasha/alan/collection/watching/browser-extensions/streaming-watching.browser-extension.extension-worker.code.ts"
import type {
  Held,
  Patch,
  Sighting,
} from "akasha/alan/collection/watching/modules/episode-recording/episode-recording.module.code.ts"
import { manifestFault } from "akasha/command/pages/deploy/modules/extension-placing/deploy-extension-placing.module.code.ts"

const SEASON = "frieren-beyond-journeys-end-season-1"

const SIGHTING: Sighting = {
  service: "crunchyroll",
  show: "Frieren: Beyond Journey's End",
  season: 1,
  episode: 2,
  name: "The Blue Moon",
  film: false,
  minutes: 24,
  link: "https://www.crunchyroll.com/watch/G0DUND0K2/the-journeys-end",
}

const HELD: Held = {
  shows: [
    {
      slug: "frieren-beyond-journeys-end",
      title: "Frieren: Beyond Journey's End",
      status: "not-started",
    },
  ],
  films: [],
  seasons: [{ slug: SEASON, position: 1, status: "not-started" }],
  episodes: [
    {
      slug: "frieren-beyond-journeys-end-s01e01",
      title: "The Journey's End",
      position: 1,
      status: "completed",
      ownLength: 24,
      partOfCollections: [`season/${SEASON}`],
    },
    {
      slug: "frieren-beyond-journeys-end-s01e02",
      title: "The Blue Moon",
      position: 2,
      status: "not-started",
      ownLength: 24,
      partOfCollections: [`season/${SEASON}`],
    },
  ],
}

describe("MANIFEST", () => {
  test("the manifest is one a deploy places", () => {
    expect(manifestFault(MANIFEST)).toBeNull()
  })

  test("the worker reaches alanwalton.com and Crunchyroll", () => {
    expect(MANIFEST.host_permissions).toContain("https://alanwalton.com/*")
    expect(MANIFEST.content_scripts[0]?.matches).toContain("https://www.crunchyroll.com/*")
  })
})

describe("writeOf", () => {
  test("a patch writes one page by its slug", () => {
    const patch: Patch = { pageTypeSlug: "episode", slug: "a-s01e01", set: { status: "completed" } }
    expect(JSON.parse(writeOf(patch))).toEqual({
      op: "patchPage",
      args: {
        pageTypeSlug: "episode",
        where: [{ key: "slug", eq: "a-s01e01" }],
        set: { status: "completed" },
      },
    })
  })
})

describe("dayNow", () => {
  test("a night in Denver is still that day", () => {
    expect(dayNow(new Date("2026-10-30T03:00:00Z"))).toBe("2026-10-29")
  })
})

describe("watched", () => {
  test("a show akasha holds nothing for writes nothing and says so", async () => {
    const writes: Patch[] = []
    const answer = await watched(
      SIGHTING,
      async () => ({ shows: [], films: [], seasons: [], episodes: [] }),
      async (patch) => {
        writes.push(patch)
        return undefined
      },
      "2026-10-29"
    )
    expect(writes).toEqual([])
    expect(answer.said).toContain("no show titled")
  })

  test("an episode is written to its page, its season and its show", async () => {
    const writes: Patch[] = []
    const answer = await watched(
      SIGHTING,
      async () => HELD,
      async (patch) => {
        writes.push(patch)
        return undefined
      },
      "2026-10-29"
    )
    expect(writes.map((one) => one.pageTypeSlug)).toEqual(["episode", "season", "show"])
    expect(answer.recorded).toBe(true)
  })
})
