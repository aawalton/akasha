import { describe, expect, it } from "bun:test"
import {
  type EppieArtist,
  type EppieCatalog,
  type EppieSong,
  selectNextArtist,
  selectNextExploration,
  selectNextSong,
} from "./select"

function artist(id: string, over: Partial<EppieArtist> = {}): EppieArtist {
  return { id, title: id, genres: [], ...over }
}

function song(id: string, artistId: string, over: Partial<EppieSong> = {}): EppieSong {
  return {
    id,
    title: id,
    artistId,
    songType: "original",
    performed: true,
    trackType: "song",
    ...over,
  }
}

function catalog(artists: readonly EppieArtist[], songs: readonly EppieSong[]): EppieCatalog {
  return { artists, songs }
}

describe("selectNextSong", () => {
  it("returns the next unrated recorded original, stably ordered", () => {
    const cat = catalog(
      [artist("a")],
      [
        song("s2", "a", { title: "beta", sortOrder: 2 }),
        song("s1", "a", { title: "alpha", sortOrder: 1 }),
      ]
    )
    expect(selectNextSong(cat, "a")?.id).toBe("s1")
  })

  it("excludes derivatives, covers, wrote-for-others, and non-song track types", () => {
    const cat = catalog(
      [artist("a")],
      [
        song("deriv", "a", { songType: "derivative" }),
        song("cover", "a", { songType: "original", written: undefined, performed: false }),
        song("wroteForOthers", "a", { performed: false }),
        song("live", "a", { trackType: "live" }),
        song("ok", "a"),
      ]
    )
    expect(selectNextSong(cat, "a")?.id).toBe("ok")
  })

  it("skips already-rated songs", () => {
    const cat = catalog(
      [artist("a")],
      [
        song("rated", "a", { title: "alpha", sortOrder: 1, rating: "A" }),
        song("fresh", "a", { title: "beta", sortOrder: 2 }),
      ]
    )
    expect(selectNextSong(cat, "a")?.id).toBe("fresh")
  })

  it("dedupes by normalized title", () => {
    const cat = catalog(
      [artist("a")],
      [
        song("s1", "a", { title: "My Song", sortOrder: 1 }),
        song("s2", "a", { title: "my song!", sortOrder: 2 }),
      ]
    )
    expect(selectNextSong(cat, "a")?.id).toBe("s1")
    const cat2 = catalog([artist("a")], [song("s2", "a", { title: "my song!", sortOrder: 2 })])
    expect(selectNextSong(cat2, "a")?.id).toBe("s2")
  })

  it("returns null when the artist has nothing playable", () => {
    const cat = catalog([artist("a")], [song("d", "a", { songType: "derivative" })])
    expect(selectNextSong(cat, "a")).toBeNull()
  })
})

describe("selectNextArtist — cold start", () => {
  it("orders unexplored candidates by rank tier then title", () => {
    const cat = catalog(
      [artist("zed", { rank: "Not Ranked" }), artist("ace", { rank: "S-Rank" }), artist("bee")],
      [song("s_zed", "zed"), song("s_ace", "ace"), song("s_bee", "bee")]
    )
    expect(selectNextArtist(cat)?.id).toBe("ace")
  })

  it("falls back to title ordering when no rank present", () => {
    const cat = catalog(
      [artist("charlie", { title: "Charlie" }), artist("alpha", { title: "Alpha" })],
      [song("s_c", "charlie"), song("s_a", "alpha")]
    )
    expect(selectNextArtist(cat)?.id).toBe("alpha")
  })

  it("skips candidates with no playable song", () => {
    const cat = catalog(
      [artist("alpha", { title: "Alpha" }), artist("beta", { title: "Beta" })],
      [song("d", "alpha", { songType: "derivative" }), song("ok", "beta")]
    )
    expect(selectNextArtist(cat)?.id).toBe("beta")
  })

  it("returns null when no unexplored playable artist remains", () => {
    const cat = catalog([artist("a", { rating: "A" })], [song("s", "a", { rating: "B" })])
    expect(selectNextArtist(cat)).toBeNull()
  })
})

describe("selectNextArtist — adjacency to the loved set", () => {
  it("prefers the unexplored artist with greater genre overlap to a loved artist", () => {
    const loved = artist("loved", { rating: "S", genres: ["pop", "rock"] })
    const near = artist("near", { title: "Near", genres: ["pop", "rock", "indie"] })
    const far = artist("far", { title: "Far", genres: ["jazz", "classical"] })
    const cat = catalog([loved, near, far], [song("s_near", "near"), song("s_far", "far")])
    expect(selectNextArtist(cat)?.id).toBe("near")
  })

  it("treats an artist with a liked SONG (not artist rating) as a loved edge", () => {
    const lovedViaSong = artist("lvs", { genres: ["folk"] })
    const near = artist("near", { title: "Near", genres: ["folk"] })
    const far = artist("far", { title: "Far", genres: ["metal"] })
    const cat = catalog(
      [lovedViaSong, near, far],
      [song("hit", "lvs", { rating: "A" }), song("s_near", "near"), song("s_far", "far")]
    )
    expect(selectNextArtist(cat)?.id).toBe("near")
  })

  it("lets a related-id match override genre distance", () => {
    const loved = artist("loved", { rating: "S", genres: ["pop"], relatedExternalIds: ["mb-far"] })
    const near = artist("near", { title: "Near", genres: ["pop"] })
    const far = artist("far", { title: "Far", genres: ["jazz"], externalId: "mb-far" })
    const cat = catalog([loved, near, far], [song("s_near", "near"), song("s_far", "far")])
    expect(selectNextArtist(cat)?.id).toBe("far")
  })

  it("excludes already-explored (disliked) artists from the new-artist pool", () => {
    const loved = artist("loved", { rating: "S", genres: ["pop"] })
    const disliked = artist("disliked", { title: "Disliked", genres: ["pop"], rating: "F" })
    const fresh = artist("fresh", { title: "Fresh", genres: ["pop"] })
    const cat = catalog([loved, disliked, fresh], [song("d", "disliked"), song("s_fresh", "fresh")])
    expect(selectNextArtist(cat)?.id).toBe("fresh")
  })
})

describe("selectNextExploration — composed loop", () => {
  it("cold catalog: goes straight to a new artist with its first song", () => {
    const cat = catalog(
      [artist("ace", { rank: "S-Rank" }), artist("bee")],
      [song("s_ace", "ace", { title: "first", sortOrder: 1 }), song("s_bee", "bee")]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("new-artist")
    if (sel.kind === "new-artist") {
      expect(sel.artist.id).toBe("ace")
      expect(sel.firstSong.id).toBe("s_ace")
    }
  })

  it("liked artist with remaining originals takes precedence over a new artist", () => {
    const loved = artist("loved", { rating: "A", genres: ["pop"] })
    const fresh = artist("fresh", { genres: ["pop"] })
    const cat = catalog(
      [loved, fresh],
      [
        song("hit", "loved", { title: "hit", sortOrder: 1, rating: "A" }),
        song("more", "loved", { title: "more", sortOrder: 2 }),
        song("s_fresh", "fresh"),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("song-in-liked-artist")
    if (sel.kind === "song-in-liked-artist") {
      expect(sel.artist.id).toBe("loved")
      expect(sel.song.id).toBe("more")
    }
  })

  it("moves to a new artist once liked artists are mined out", () => {
    const loved = artist("loved", { rating: "A", genres: ["pop"] })
    const fresh = artist("fresh", { title: "Fresh", genres: ["pop"] })
    const cat = catalog(
      [loved, fresh],
      [song("hit", "loved", { rating: "A" }), song("s_fresh", "fresh")]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("new-artist")
    if (sel.kind === "new-artist") expect(sel.artist.id).toBe("fresh")
  })

  it("orders the continuation pool by how loved each artist is", () => {
    const aLoved = artist("aLoved", { rating: "A", genres: [] })
    const sLoved = artist("sLoved", { rating: "S", genres: [] })
    const cat = catalog(
      [aLoved, sLoved],
      [
        song("a1", "aLoved", { title: "a1", sortOrder: 1 }),
        song("s1", "sLoved", { title: "s1", sortOrder: 1 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("song-in-liked-artist")
    if (sel.kind === "song-in-liked-artist") expect(sel.artist.id).toBe("sLoved")
  })

  it("reports exhausted when nothing is left to explore", () => {
    const cat = catalog(
      [artist("a", { rating: "S" })],
      [song("s", "a", { rating: "A" }), song("d", "a", { songType: "derivative" })]
    )
    expect(selectNextExploration(cat).kind).toBe("exhausted")
  })

  it("empty catalog is exhausted", () => {
    expect(selectNextExploration(catalog([], [])).kind).toBe("exhausted")
  })
})

describe("half-step (+/-) grades", () => {
  it("does not resurface a song rated with a half-step grade", () => {
    const cat = catalog(
      [artist("a")],
      [
        song("rated", "a", { title: "alpha", sortOrder: 1, rating: "A+" }),
        song("fresh", "a", { title: "beta", sortOrder: 2 }),
      ]
    )
    expect(selectNextSong(cat, "a")?.id).toBe("fresh")
  })

  it("treats an artist with a half-step-graded song (A+) as loved", () => {
    const lovedViaHalf = artist("lvh", { genres: ["folk"] })
    const near = artist("near", { title: "Near", genres: ["folk"] })
    const far = artist("far", { title: "Far", genres: ["metal"] })
    const cat = catalog(
      [lovedViaHalf, near, far],
      [song("hit", "lvh", { rating: "A+" }), song("s_near", "near"), song("s_far", "far")]
    )
    expect(selectNextArtist(cat)?.id).toBe("near")
  })

  it("mines a half-step-rated artist's remaining originals before reaching for a new artist", () => {
    const loved = artist("loved", { rating: "B-", genres: ["pop"] })
    const fresh = artist("fresh", { genres: ["pop"] })
    const cat = catalog(
      [loved, fresh],
      [
        song("hit", "loved", { title: "hit", sortOrder: 1, rating: "S+" }),
        song("more", "loved", { title: "more", sortOrder: 2 }),
        song("s_fresh", "fresh"),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("song-in-liked-artist")
    if (sel.kind === "song-in-liked-artist") {
      expect(sel.artist.id).toBe("loved")
      expect(sel.song.id).toBe("more")
    }
  })

  it("a B- half-step counts as loved (lower edge of the liked set)", () => {
    const loved = artist("loved", { rating: "B-", genres: ["jazz"] })
    const fresh = artist("fresh", { title: "Fresh", genres: ["jazz"] })
    const cat = catalog([loved, fresh], [song("s_fresh", "fresh")])
    expect(selectNextArtist(cat)?.id).toBe("fresh")
  })
})
