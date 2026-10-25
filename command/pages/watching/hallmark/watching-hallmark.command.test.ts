import { expect, test } from "bun:test"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { showCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.ts"
import {
  dayOf,
  type Listed,
  listedFrom,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-listing/hallmark-listing.module.code.ts"
import {
  alike,
  distinguishing,
  type Matched,
  type Refused,
  servicesIn,
  type Titled,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"
import {
  baseOf,
  christmasOf,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-series/hallmark-series.module.code.ts"
import {
  SHELVES,
  shelved,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-shelving/hallmark-shelving.module.code.ts"

const SHELVED_AS = `${showCollection.slug}/`

const SHOW = show.slug

const SEASON = season.slug

const ROMANCE = `${SHELVED_AS}${SHELVES.romance.slug}`

const MYSTERY = `${SHELVED_AS}${SHELVES.mystery.slug}`

const CHRISTMAS = `${SHELVED_AS}${SHELVES.christmas.slug}`

const WIKITEXT = [
  "==2020==",
  "===Hallmark Channel===",
  '{|class="wikitable sortable"',
  "|-",
  "! Movie !! Starring !! Director !! Original airdate",
  "|-",
  "|''Winter in Vail'' (W)",
  "|[[Lacey Chabert]]",
  "|Terry Ingram",
  "|January 4, 2020<ref>a viewing count</ref>",
  "|-",
  "|''[[Christmas House (film)|The Christmas House]]'' (CtC)",
  "|A",
  "|B",
  "|November 22, 2020",
  "|}",
  "===Hallmark Movies & Mysteries===",
  "{|",
  "! Movie !! Starring !! Director !! Original airdate",
  "|-",
  "| ''[[Garage Sale Mystery (film series)|Garage Sale Mystery: The Deadly Room]]''",
  "|C",
  "|D",
  "|March 1, 2020",
  "|}",
  "==See also==",
  "{|",
  "|''Nothing''",
  "|}",
].join("\n")

const NOTHING_HELD = {
  movie: [],
  show: [],
  franchise: [],
  "show-collection": [],
  season: [],
  episode: [],
}

const DAY = "2026-10-25"

function listing(title: string, more: Partial<Listed> = {}): Listed {
  return {
    title,
    alsoTitled: null,
    year: 2020,
    network: "Hallmark Channel",
    blocks: [],
    inJuly: false,
    aired: "2020-01-04",
    article: null,
    ...more,
  }
}

function titling(id: number, title: string, more: Partial<Titled> = {}): Titled {
  return {
    kind: "movie",
    id,
    title,
    publishedAt: "2020-01-04",
    minutes: 84,
    gathering: null,
    posterPath: null,
    imdbId: null,
    genres: ["Romance"],
    voteAverage: null,
    services: [],
    episodes: null,
    loose: false,
    ...more,
  }
}

function matching(title: string, titled: Titled | null, refused: Refused | null = null): Matched {
  return { listed: listing(title), titled, refused }
}

test("each row of each table is read with the year and channel heading it", () => {
  const listed = listedFrom(WIKITEXT)
  expect(listed.map((one) => one.title)).toEqual([
    "Winter in Vail",
    "The Christmas House",
    "Garage Sale Mystery: The Deadly Room",
  ])
  expect(listed[0]?.blocks).toEqual(["W"])
  expect(listed[0]?.aired).toBe("2020-01-04")
  expect(listed[1]?.blocks).toEqual(["CtC"])
  expect(listed[2]?.network).toBe("Hallmark Movies & Mysteries")
  expect(listed[2]?.article).toBe("Garage Sale Mystery (film series)")
})

test("an airdate is read as the first day it names", () => {
  expect(dayOf("April 2–3, 2008")).toBe("2008-04-02")
  expect(dayOf("TBA")).toBe(null)
})

test("a title is alike another that differs only in its plurals", () => {
  const one = "Hailey Dean Mystery: Deadly Estate"
  expect(alike(one, "Hailey Dean Mysteries: Deadly Estate")).toBe(true)
  expect(alike("Angels Sing", "Angels Sing: Libera in America")).toBe(false)
})

test("the services are the subscription and free ones TMDB names for the US", () => {
  const said = {
    results: {
      US: {
        flatrate: [{ provider_name: "Philo" }],
        ads: [{ provider_name: "Tubi TV" }],
        rent: [{ provider_name: "Apple TV" }],
      },
      CA: { flatrate: [{ provider_name: "Crave" }] },
    },
  }
  expect(servicesIn(said)).toEqual(["Philo", "Tubi TV"])
})

test("a Christmas block or a Christmas word makes a Christmas title", () => {
  const spark = listing("A Holiday Spark", { blocks: ["CtC"] })
  expect(christmasOf(spark, spark.title)).toBe(true)
  expect(christmasOf(listing("Meet the Santas"), "Meet the Santas")).toBe(true)
  const vail = listing("Winter in Vail", { blocks: ["W"] })
  expect(christmasOf(vail, vail.title)).toBe(false)
})

test("the mystery channel or a mystery genre makes a mystery", () => {
  expect(baseOf(listing("A", { network: "Hallmark Mystery" }), null)).toBe("mystery")
  expect(baseOf(listing("A"), titling(1, "A", { genres: ["Crime"] }))).toBe("mystery")
  expect(baseOf(listing("A"), titling(1, "A"))).toBe("romance")
})

test("titles sharing a TMDB collection are shelved under one series", () => {
  const gathering = { id: 9, name: "Garage Sale Mysteries Collection" }
  const mystery = { gathering, genres: ["Mystery"] }
  const listed = [
    matching("Garage Sale Mystery: A", titling(1, "Garage Sale Mystery: A", mystery)),
    matching("Garage Sale Mystery: B", titling(2, "Garage Sale Mystery: B", mystery)),
    matching("Winter in Vail", titling(3, "Winter in Vail")),
  ]
  const shelf = shelved({ listed, shows: [], held: NOTHING_HELD, day: DAY })
  const franchise = shelf.pages.find((one) => one.pageTypeSlug === "franchise")
  expect(franchise?.values.partOfCollections).toEqual([MYSTERY])
  const film = shelf.pages.find((one) => one.slug === "garage-sale-mystery-a")
  expect(film?.values.partOfCollections).toEqual([`franchise/${franchise?.slug ?? ""}`])
  const alone = shelf.pages.find((one) => one.slug === "winter-in-vail")
  expect(alone?.values.partOfCollections).toEqual([ROMANCE])
})

test("a held title gains its shelf, keeps its status and loses services it left", () => {
  const row = {
    slug: "winter-in-vail",
    title: "Winter in Vail",
    partOfCollections: [CHRISTMAS],
    externalIdentity: [{ source: "tmdb", externalId: "3" }],
    streamingOn: ["Philo"],
  }
  const listed = [matching("Winter in Vail", titling(3, "Winter in Vail"))]
  const shelf = shelved({ listed, shows: [], held: { ...NOTHING_HELD, movie: [row] }, day: DAY })
  const page = shelf.pages.find((one) => one.slug === "winter-in-vail")
  expect(page?.merge).toBe(true)
  expect(page?.values.partOfCollections).toEqual([CHRISTMAS, ROMANCE])
  expect(page?.values.status).toBe(undefined)
  expect(page?.clears).toEqual(["streamingOn"])
})

test("a name that makes no export name opens with its page type", () => {
  const listed = [
    matching("Class", titling(4, "Class")),
    matching("12 Gifts of Christmas", titling(5, "12 Gifts of Christmas")),
  ]
  const shelf = shelved({ listed, shows: [], held: NOTHING_HELD, day: DAY })
  const slugs = shelf.pages.filter((one) => one.pageTypeSlug === "movie").map((one) => one.slug)
  expect(slugs).toEqual(["movie-class", "movie-12-gifts-of-christmas"])
})

test("a near title that differs in a word that tells it apart is distinguished", () => {
  const blessing = "When Calls the Heart: The Greatest Christmas Blessing"
  expect(distinguishing(blessing, "When Calls the Heart: The Greatest Christmas Wish")).toEqual([
    "blessing",
    "wish",
  ])
  expect(distinguishing("Do I Say I Do?", "Say I Do")).toEqual(["i", "do"])
  expect(distinguishing("The Confession", "Beverly Lewis' The Confession")).toEqual([])
  const note = "The Note II: Taking a Chance on Love"
  expect(distinguishing("Taking a Chance on Love", note)).toEqual([])
  const dean = "Hailey Dean Mysteries: Dating Is Murder"
  expect(distinguishing("Hailey Dean Mystery: Dating is Murder", dean)).toEqual([])
})

test("a held page holding a refused match loses it and what TMDB gave it", () => {
  const row = {
    slug: "say-i-do",
    title: "Do I Say I Do?",
    partOfCollections: [ROMANCE],
    externalIdentity: [{ source: "tmdb", externalId: "77" }],
    streamingOn: ["Philo"],
  }
  const refused = { kind: "movie", id: 77, title: "Say I Do" } as const
  const listed = [matching("Do I Say I Do?", null, refused)]
  const shelf = shelved({ listed, shows: [], held: { ...NOTHING_HELD, movie: [row] }, day: DAY })
  const page = shelf.pages.find((one) => one.slug === "say-i-do")
  expect(page?.values.ownLength).toBe(0)
  expect(page?.values.externalIdentity).toBe(undefined)
  expect(page?.clears).toContain("externalIdentity")
  expect(page?.clears).toContain("streamingOn")
  expect(page?.clears).toContain("posterPath")
})

test("a listed film held as a show for a refused match is taken off and written as a movie", () => {
  const shown = {
    slug: "do-i-say-i-do",
    title: "Do I Say I Do?",
    partOfCollections: [ROMANCE],
    publishedAt: "2020-01-04",
  }
  const aSeason = { slug: "a-season", partOfCollections: [`${SHOW}/${shown.slug}`] }
  const anEpisode = { slug: "an-episode", partOfCollections: [`${SEASON}/a-season`] }
  const elsewhere = { ...shown, slug: "a-show-of-its-own", partOfCollections: [`${SHELVED_AS}x`] }
  const held = {
    ...NOTHING_HELD,
    show: [elsewhere, shown],
    season: [aSeason],
    episode: [anEpisode],
  }
  const refused = { kind: "tv", id: 9, title: "Say I Do" } as const
  const shelf = shelved({
    listed: [matching("Do I Say I Do?", null, refused)],
    shows: [],
    held,
    day: DAY,
  })
  expect(shelf.removes).toEqual([
    { pageTypeSlug: "show", slug: "do-i-say-i-do" },
    { pageTypeSlug: SEASON, slug: "a-season" },
    { pageTypeSlug: "episode", slug: "an-episode" },
  ])
  const film = shelf.pages.find((one) => one.pageTypeSlug === "movie")
  expect(film?.fresh).toBe(true)
  expect(film?.slug).toBe("do-i-say-i-do")
  expect(film?.values.partOfCollections).toEqual([ROMANCE])
  expect(film?.values.status).toBe("not-started")
  expect(film?.values.publishedAt).toBe("2020-01-04")
})
