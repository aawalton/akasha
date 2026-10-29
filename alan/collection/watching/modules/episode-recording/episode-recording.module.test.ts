import { describe, expect, test } from "bun:test"
import {
  type Held,
  type Row,
  recordingFor,
  type Sighting,
  titleKey,
} from "akasha/alan/collection/watching/modules/episode-recording/episode-recording.module.code.ts"

const DAY = "2026-10-29"

const SEASON = "frieren-beyond-journeys-end-season-1"

const SHOW = "frieren-beyond-journeys-end"

function episodeRow(at: number, status: string, title: string): Row {
  return {
    slug: `${SHOW}-s01e${String(at).padStart(2, "0")}`,
    title,
    position: at,
    status,
    ownLength: 24,
    partOfCollections: [`season/${SEASON}`],
  }
}

function held(episodes: readonly Row[], seasonStatus = "in-progress"): Held {
  return {
    shows: [{ slug: SHOW, title: "Frieren: Beyond Journey's End", status: "in-progress" }],
    films: [
      { slug: "a-silent-voice", title: "A Silent Voice", status: "not-started", ownLength: 0 },
    ],
    seasons: [{ slug: SEASON, position: 1, status: seasonStatus }],
    episodes,
  }
}

const SIGHTING: Sighting = {
  service: "crunchyroll",
  show: "Frieren: Beyond Journey's End",
  season: 1,
  episode: 2,
  name: "The Journey's End",
  film: false,
  minutes: null,
  link: "https://www.crunchyroll.com/watch/G0DUND0K2/the-journeys-end",
}

describe("titleKey", () => {
  test("a title is keyed by its letters and digits alone", () => {
    expect(titleKey("Frieren: Beyond Journey's End")).toBe(titleKey("frieren beyond journeys end"))
  })
})

describe("recordingFor", () => {
  test("an episode is recorded as watched", () => {
    const recording = recordingFor(
      SIGHTING,
      held([
        episodeRow(1, "completed", "The Journey's End"),
        episodeRow(2, "not-started", "The Blue Moon"),
      ]),
      DAY
    )
    const written = recording.patches.find((one) => one.pageTypeSlug === "episode")
    expect(written?.set).toEqual({ status: "completed", completedAt: DAY, ownProgress: 24 })
  })

  test("the show is recognized whatever the case and punctuation", () => {
    const recording = recordingFor(
      { ...SIGHTING, show: "frieren beyond journeys end" },
      held([
        episodeRow(1, "completed", "The Journey's End"),
        episodeRow(2, "not-started", "The Blue Moon"),
      ]),
      DAY
    )
    expect(recording.patches.length).toBeGreaterThan(0)
  })

  test("the last episode of a season finishes the season", () => {
    const recording = recordingFor(
      SIGHTING,
      held([
        episodeRow(1, "completed", "The Journey's End"),
        episodeRow(2, "not-started", "The Blue Moon"),
      ]),
      DAY
    )
    const season = recording.patches.find((one) => one.pageTypeSlug === "season")
    expect(season?.set).toEqual({ status: "completed", completedAt: DAY })
    expect(recording.said).toContain("Season 1 is done")
  })

  test("an episode with others left in its season moves the season along", () => {
    const recording = recordingFor(
      SIGHTING,
      held(
        [
          episodeRow(1, "completed", "The Journey's End"),
          episodeRow(2, "not-started", "The Blue Moon"),
          episodeRow(3, "not-started", "Killing Magic"),
        ],
        "not-started"
      ),
      DAY
    )
    const season = recording.patches.find((one) => one.pageTypeSlug === "season")
    expect(season?.set).toEqual({ status: "in-progress" })
  })

  test("a show not begun is moved to in progress", () => {
    const rows = held([
      episodeRow(1, "completed", "The Journey's End"),
      episodeRow(2, "not-started", "The Blue Moon"),
    ])
    const recording = recordingFor(
      SIGHTING,
      { ...rows, shows: [{ ...rows.shows[0], status: "not-started" }] },
      DAY
    )
    const show = recording.patches.find((one) => one.pageTypeSlug === "show")
    expect(show?.set).toEqual({ status: "in-progress" })
  })

  test("an episode already recorded writes nothing", () => {
    const recording = recordingFor(
      SIGHTING,
      held([episodeRow(2, "completed", "The Blue Moon")]),
      DAY
    )
    expect(recording.patches).toEqual([])
    expect(recording.said).toContain("already")
  })

  test("a show akasha holds nothing for writes nothing", () => {
    const recording = recordingFor(
      { ...SIGHTING, show: "Some Other Show" },
      held([episodeRow(2, "not-started", "x")]),
      DAY
    )
    expect(recording.patches).toEqual([])
    expect(recording.said).toContain("no show titled Some Other Show")
  })

  test("an episode akasha holds nothing for writes nothing", () => {
    const recording = recordingFor(
      { ...SIGHTING, episode: 9 },
      held([episodeRow(2, "not-started", "x")]),
      DAY
    )
    expect(recording.patches).toEqual([])
    expect(recording.said).toContain("no episode 9")
  })

  test("an episode is found by its title where the page names no season", () => {
    const recording = recordingFor(
      { ...SIGHTING, season: null },
      held([episodeRow(2, "not-started", "The Blue Moon")]),
      DAY
    )
    expect(recording.patches.some((one) => one.pageTypeSlug === "episode")).toBe(true)
  })

  test("a film is recorded with the minutes it runs to", () => {
    const recording = recordingFor(
      {
        ...SIGHTING,
        show: "A Silent Voice",
        episode: null,
        season: null,
        film: true,
        minutes: 130,
      },
      held([]),
      DAY
    )
    expect(recording.patches).toEqual([
      {
        pageTypeSlug: "movie",
        slug: "a-silent-voice",
        set: { status: "completed", completedAt: DAY, ownLength: 130, ownProgress: 130 },
      },
    ])
  })
})
