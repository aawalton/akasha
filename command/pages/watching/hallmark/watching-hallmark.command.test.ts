import { expect, test } from "bun:test"
import { showCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.ts"
import {
  dayOf,
  type Listed,
  listedFrom,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-listing/hallmark-listing.module.code.ts"
import {
  alike,
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

const NOTHING_HELD = { movie: [], show: [], franchise: [], "show-collection": [] }

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
    {
      listed: listing("Garage Sale Mystery: A"),
      titled: titling(1, "Garage Sale Mystery: A", mystery),
    },
    {
      listed: listing("Garage Sale Mystery: B"),
      titled: titling(2, "Garage Sale Mystery: B", mystery),
    },
    { listed: listing("Winter in Vail"), titled: titling(3, "Winter in Vail") },
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
  const listed = [{ listed: listing("Winter in Vail"), titled: titling(3, "Winter in Vail") }]
  const shelf = shelved({ listed, shows: [], held: { ...NOTHING_HELD, movie: [row] }, day: DAY })
  const page = shelf.pages.find((one) => one.slug === "winter-in-vail")
  expect(page?.merge).toBe(true)
  expect(page?.values.partOfCollections).toEqual([CHRISTMAS, ROMANCE])
  expect(page?.values.status).toBe(undefined)
  expect(page?.clears).toEqual(["streamingOn"])
})
