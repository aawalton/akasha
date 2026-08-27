import { describe, expect, test } from "bun:test"
import { artistSlugOf, mintSongSlug, slugifyName, songSlugBase } from "./song-slug"

describe("songSlugBase", () => {
  test("joins the artist slug to the slugified title", () => {
    expect(songSlugBase("ariana-grande", "bad idea")).toBe("ariana-grande-bad-idea")
  })

  test("turns every run of punctuation into one dash", () => {
    expect(songSlugBase("ariana-grande", "34+35")).toBe("ariana-grande-34-35")
    expect(songSlugBase("ariana-grande", "yes, and?")).toBe("ariana-grande-yes-and")
  })

  test("folds a diacritic to its base letter rather than dropping it", () => {
    expect(songSlugBase("zara-larsson", "Säg mig var du står")).toBe(
      "zara-larsson-sag-mig-var-du-star"
    )
    expect(songSlugBase("sia", "Déjà Vu")).toBe("sia-deja-vu")
    expect(songSlugBase("zara-larsson", "Tänd ett ljus")).toBe("zara-larsson-tand-ett-ljus")
    expect(
      songSlugBase("ariana-grande", "E più ti penso (From “Once Upon a Time in America”)")
    ).toBe("ariana-grande-e-piu-ti-penso-from-once-upon-a-time-in-america")
  })

  test("names a title that slugifies to nothing `untitled`", () => {
    expect(songSlugBase("mitski", "グライド")).toBe("mitski-untitled")
    expect(songSlugBase("billie-eilish", "!!!!!!!")).toBe("billie-eilish-untitled")
    expect(songSlugBase("sia", "不要不要的")).toBe("sia-untitled")
  })
})

describe("mintSongSlug", () => {
  test("takes the bare base when nothing holds it", () => {
    expect(mintSongSlug("sia", "Alive", new Set())).toBe("sia-alive")
  })

  test("counts from two, never from one", () => {
    expect(mintSongSlug("sia", "Alive", new Set(["sia-alive"]))).toBe("sia-alive-2")
  })

  test("walks past every number already standing", () => {
    const taken = new Set(["sia-alive", "sia-alive-2"])
    expect(mintSongSlug("sia", "Alive", taken)).toBe("sia-alive-3")
  })

  test("two titles that slugify alike collide, whatever their casing", () => {
    const taken = new Set<string>()
    const first = mintSongSlug("billie-eilish", "lovely", taken)
    taken.add(first)
    const second = mintSongSlug("billie-eilish", "Lovely", taken)
    taken.add(second)
    const third = mintSongSlug("billie-eilish", "Lovely", taken)
    expect([first, second, third]).toEqual([
      "billie-eilish-lovely",
      "billie-eilish-lovely-2",
      "billie-eilish-lovely-3",
    ])
  })

  test("a number already held does not push an unrelated base aside", () => {
    const taken = new Set(["sia-alive-2"])
    expect(mintSongSlug("sia", "Alive", taken)).toBe("sia-alive")
  })
})

describe("artistSlugOf", () => {
  test("is the same slugifier the song rule uses, with no artist prefix", () => {
    expect(artistSlugOf("AURORA")).toBe("aurora")
    expect(artistSlugOf("Em Beihold")).toBe("em-beihold")
    expect(artistSlugOf("Taylor Swift")).toBe("taylor-swift")
  })
})

describe("slugifyName", () => {
  test("trims the dashes a leading or trailing symbol would leave", () => {
    expect(slugifyName("...Ready For It?")).toBe("ready-for-it")
  })
})
