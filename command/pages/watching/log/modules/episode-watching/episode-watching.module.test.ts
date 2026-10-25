import { expect, test } from "bun:test"
import {
  type HeldShow,
  plannedFor,
} from "akasha/command/pages/watching/log/modules/episode-watching/episode-watching.module.code.ts"
import {
  type AiredEpisode,
  type AiredSeason,
  airedSeasonIn,
  episodeTypeOf,
  seasonNumbersIn,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

const SHOWN: HeldShow = {
  slug: "my-dress-up-darling",
  title: "My Dress-Up Darling",
  status: "in-progress",
  identities: [],
}

function airedEpisode(number: number): AiredEpisode {
  return {
    number,
    id: 1000 + number,
    name: `Episode ${String(number)}`,
    overview: "",
    runtime: 24,
    airDate: "2022-01-09",
    episodeType: "standard",
    stillPath: null,
    voteAverage: null,
  }
}

function airedSeason(number: number, episodes: number): AiredSeason {
  return {
    number,
    id: 500 + number,
    name: `Season ${String(number)}`,
    overview: "",
    airDate: "2022-01-09",
    posterPath: null,
    voteAverage: null,
    episodes: Array.from({ length: episodes }, (_, at) => airedEpisode(at + 1)),
  }
}

const HELD_SEASON = { slug: "my-dress-up-darling-season-1", position: 1, status: "in-progress" }

function heldEpisode(position: number, status: string) {
  return {
    slug: `my-dress-up-darling-s01e${String(position).padStart(2, "0")}`,
    season: HELD_SEASON.slug,
    position,
    status,
    ownLength: 24,
  }
}

test("a TMDB season reads with its episodes", () => {
  const said = {
    id: 190461,
    season_number: 1,
    name: "Season 1",
    air_date: "2022-01-09",
    episodes: [{ id: 2873014, episode_number: 1, name: "Someone", runtime: 24 }],
  }
  const read = airedSeasonIn(said)
  expect(read?.id).toBe(190461)
  expect(read?.episodes[0]?.runtime).toBe(24)
})

test("an episode type TMDB answers is spelled as the catalogue spells it", () => {
  expect(episodeTypeOf("mid_season")).toBe("mid-season")
  expect(episodeTypeOf("finale")).toBe("finale")
  expect(episodeTypeOf("special")).toBe(null)
})

test("the season numbered zero is left out of a show's seasons", () => {
  const said = { seasons: [{ season_number: 0 }, { season_number: 1 }, { season_number: 2 }] }
  expect(seasonNumbersIn(said)).toEqual([1, 2])
})

test("the first episode not completed is the one watched", () => {
  const held = [
    heldEpisode(1, "completed"),
    heldEpisode(2, "completed"),
    heldEpisode(3, "not-started"),
  ]
  const planned = plannedFor(
    SHOWN,
    "123249",
    [airedSeason(1, 3)],
    [HELD_SEASON],
    held,
    "2026-10-16"
  )
  if (typeof planned === "string") throw new Error(planned)
  const watched = planned.pages.find((one) => one.slug === "my-dress-up-darling-s01e03")
  expect(watched?.values).toEqual({
    status: "completed",
    completedAt: "2026-10-16",
    ownProgress: 24,
  })
  const season = planned.pages.find((one) => one.slug === HELD_SEASON.slug)
  expect(season?.values).toEqual({ status: "completed", completedAt: "2026-10-16" })
})

test("an episode TMDB lists and the season lacks is written as fresh", () => {
  const held = [heldEpisode(1, "completed")]
  const planned = plannedFor(
    SHOWN,
    "123249",
    [airedSeason(1, 3)],
    [HELD_SEASON],
    held,
    "2026-10-16"
  )
  if (typeof planned === "string") throw new Error(planned)
  const fresh = planned.pages.filter((one) => one.fresh === true)
  expect(fresh.map((one) => one.slug)).toEqual([
    "my-dress-up-darling-s01e02",
    "my-dress-up-darling-s01e03",
  ])
  expect(fresh[0]?.values.status).toBe("completed")
  expect(fresh[1]?.values.status).toBe("not-started")
})

test("a show with no season is given every season TMDB lists", () => {
  const planned = plannedFor(
    SHOWN,
    "123249",
    [airedSeason(1, 2), airedSeason(2, 2)],
    [],
    [],
    "2026-10-16"
  )
  if (typeof planned === "string") throw new Error(planned)
  const seasons = planned.pages.filter((one) => one.pageTypeSlug === "season")
  expect(seasons.map((one) => one.slug)).toEqual([
    "my-dress-up-darling-season-1",
    "my-dress-up-darling-season-2",
  ])
  expect(seasons[0]?.values.status).toBe("in-progress")
  expect(seasons[1]?.values.status).toBe("not-started")
})

test("a show missing its TMDB id is given it", () => {
  const planned = plannedFor(SHOWN, "123249", [airedSeason(1, 1)], [], [], "2026-10-16")
  if (typeof planned === "string") throw new Error(planned)
  const shown = planned.pages.find((one) => one.pageTypeSlug === "show")
  expect(shown?.values).toEqual({
    externalIdentity: [
      {
        source: "tmdb",
        externalId: "123249",
        externalLink: "https://www.themoviedb.org/tv/123249",
      },
    ],
  })
})

test("a show whose every episode is watched is refused", () => {
  const held = [heldEpisode(1, "completed")]
  const planned = plannedFor(
    SHOWN,
    "123249",
    [airedSeason(1, 1)],
    [HELD_SEASON],
    held,
    "2026-10-16"
  )
  expect(planned).toContain("is watched already")
})
