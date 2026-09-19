import { expect, test } from "bun:test"
import {
  metIn,
  strangerIn,
} from "akasha/alan/music/catalog/modules/catalogue-held/catalogue-held.module.code.ts"

const FILED = new Set(["alwaysanangel", "fallenangel"])

const SAY = "say `--mbid` to bring it in anyway"

function asked(args: { readonly held?: ReadonlySet<string>; readonly titles: readonly string[] }) {
  return strangerIn({
    artistName: "Alexandria",
    artistSlug: "alexandria",
    held: args.held === undefined ? FILED : args.held,
    titles: args.titles,
    sayInstead: SAY,
  })
}

test("an artist whose titles meet no track already filed under that artist is a stranger", () => {
  const said = asked({ titles: ["Sepulchral Silence", "Black Rain"] })
  expect(said).toContain("none is a track filed")
  expect(said).toContain("`artist/alexandria`")
  expect(said).toContain(SAY)
})

test("an artist meeting one track already filed is no stranger", () => {
  expect(asked({ titles: ["Always an Angel", "Black Rain"] })).toBeNull()
})

test("a track filed under a version of the title still meets the work", () => {
  expect(asked({ titles: ["Always an Angel (feat. Nobody) - Live"] })).toBeNull()
})

test("an artist with no track filed at all is no stranger", () => {
  expect(asked({ held: new Set(), titles: ["Sepulchral Silence"] })).toBeNull()
})

test("an artist MusicBrainz answers no title for is no stranger", () => {
  expect(asked({ titles: [] })).toBeNull()
})

test("how many titles meet a track already filed is counted", () => {
  expect(metIn(FILED, ["Always an Angel", "Fallen Angel - Remix", "Black Rain"])).toBe(2)
  expect(metIn(undefined, ["Always an Angel"])).toBe(0)
})
