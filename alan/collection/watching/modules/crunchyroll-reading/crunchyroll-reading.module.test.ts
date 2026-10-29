import { describe, expect, test } from "bun:test"
import {
  readCrunchyroll,
  readData,
  readMetadata,
  readTitle,
} from "akasha/alan/collection/watching/modules/crunchyroll-reading/crunchyroll-reading.module.code.ts"

const EPISODE_DATA = JSON.stringify({
  "@type": "TVEpisode",
  name: "The Journey's End",
  episodeNumber: 1,
  partOfSeason: { "@type": "TVSeason", seasonNumber: 1 },
  partOfSeries: { "@type": "TVSeries", name: "Frieren: Beyond Journey's End" },
})

describe("readTitle", () => {
  test("a title names the show, the episode and the episode's own name", () => {
    expect(readTitle("Frieren: Beyond Journey's End | E1 - The Journey's End")).toEqual({
      show: "Frieren: Beyond Journey's End",
      season: null,
      episode: 1,
      name: "The Journey's End",
      film: false,
    })
  })

  test("a title naming the season states it", () => {
    const reading = readTitle("Frieren: Beyond Journey's End | S2 E3 - A Real Hero")
    expect(reading?.season).toBe(2)
    expect(reading?.episode).toBe(3)
  })

  test("a series naming a season has that season taken off it", () => {
    const reading = readTitle("The Rising of the Shield Hero Season 2 (German Dub) | E2 - X")
    expect(reading?.show).toBe("The Rising of the Shield Hero")
    expect(reading?.season).toBe(2)
  })

  test("a title naming no show is read as naming none", () => {
    expect(readTitle("Season 1 | E1 - Yano")).toBeNull()
  })

  test("a title naming no episode is no episode", () => {
    expect(readTitle("Crunchyroll")).toBeNull()
  })
})

describe("readData", () => {
  test("an episode stated in the page's data is read", () => {
    expect(readData([EPISODE_DATA])).toEqual({
      show: "Frieren: Beyond Journey's End",
      season: 1,
      episode: 1,
      name: "The Journey's End",
      film: false,
    })
  })

  test("an episode under a graph is read", () => {
    const said = JSON.stringify({ "@graph": [JSON.parse(EPISODE_DATA)] })
    expect(readData([said])?.episode).toBe(1)
  })

  test("a film is read as a film", () => {
    const said = JSON.stringify({ "@type": "Movie", name: "A Silent Voice" })
    expect(readData([said])).toEqual({
      show: "A Silent Voice",
      season: null,
      episode: null,
      name: null,
      film: true,
    })
  })

  test("data stating nothing is read as nothing", () => {
    expect(readData(["not json"])).toBeNull()
    expect(readData([JSON.stringify({ "@type": "WebSite" })])).toBeNull()
  })

  test("the title is read before the data", () => {
    expect(
      readCrunchyroll("Frieren: Beyond Journey's End | E1 - The Journey's End", [EPISODE_DATA])
        ?.name
    ).toBe("The Journey's End")
  })
})

describe("readMetadata", () => {
  const held = JSON.stringify({
    props: {
      pageProps: {
        episode: {
          episode_metadata: {
            series_title: "Frieren: Beyond Journey's End",
            season_number: 1,
            episode_number: 4,
            episode_title: "The Land Where Souls Rest",
          },
        },
      },
    },
  })

  test("an episode the page's own metadata names is read", () => {
    expect(readMetadata([held])).toEqual({
      show: "Frieren: Beyond Journey's End",
      season: 1,
      episode: 4,
      name: "The Land Where Souls Rest",
      film: false,
    })
  })

  test("the metadata is read where the title names no episode", () => {
    expect(readCrunchyroll("Crunchyroll", [held])?.episode).toBe(4)
  })

  test("metadata naming no episode is read as nothing", () => {
    expect(readMetadata([JSON.stringify({ episode_metadata: { series_title: "x" } })])).toBeNull()
  })
})
