import { describe, expect, test } from "bun:test"
import {
  type CatalogEntry,
  parseCatalog,
  parseResolutions,
  sanitizeFolderName,
} from "./download-eso-wallpapers"

const catalogHtml = `
<div class="media-category">
  <section class="news-snip">
    <a href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/aaa.jpg"
       class="zl-link"
       data-zl-category="Wallpapers"
       data-zl-title="<h3><a href='/en-us/media/post/2763?QuakeCon-2025'>QuakeCon 2025 Dallas Pets Alive</a></h3><p>blurb</p>"
       data-zl-unique-id="m2767"><h4>QuakeCon 2025 Dallas Pets Alive</h4></a>
  </section>
  <section class="news-snip">
    <a href="https://esossl-a.akamaihd.net/assets/img/cms/media/bbb_original.jpg"
       class="zl-link"
       data-zl-title="<h3><a href='/en-us/media/post/2747?solstice'>Explore Western Solstice &amp; Sunport</a></h3><p>x</p>"
       ><h4>Explore Western Solstice &amp; Sunport</h4></a>
  </section>
  <section class="news-snip">
    <a href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/aaa.jpg"
       data-zl-title="<h3><a href='/en-us/media/post/2763?QuakeCon-2025'>QuakeCon 2025 Dallas Pets Alive</a></h3>"
       ><h4>dup</h4></a>
  </section>
</div>`

const detailHtml = `
<p>
  <a target="_blank" href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/lo.jpg?no-resize">1920x1080</a> |
  <a target="_blank" href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/mid.jpg?no-resize">2560x1440</a> |
  <a target="_blank" href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/hi.jpg?no-resize">3840x2160</a> |
  <a target="_blank" href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/phone.jpg?no-resize">750x1334</a>
</p>
<img src="https://esosslfiles-a.akamaihd.net/ape/uploads/2021/icon.png" />
<a href="https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/lo.jpg?no-resize">1920x1080</a>`

describe("parseCatalog", () => {
  test("extracts title + postId per tile and dedupes by postId", () => {
    const entries = parseCatalog(catalogHtml)
    expect(entries).toEqual<CatalogEntry[]>([
      { title: "QuakeCon 2025 Dallas Pets Alive", postId: "2763" },
      { title: "Explore Western Solstice & Sunport", postId: "2747" },
    ])
  })

  test("returns empty for markup with no wallpaper tiles", () => {
    expect(parseCatalog("<div>no tiles here</div>")).toEqual([])
  })
})

describe("parseResolutions", () => {
  test("extracts each WxH variant url, dedupes labels, ignores non-resolution links", () => {
    const res = parseResolutions(detailHtml)
    expect(res).toEqual([
      {
        label: "1920x1080",
        url: "https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/lo.jpg",
      },
      {
        label: "2560x1440",
        url: "https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/mid.jpg",
      },
      {
        label: "3840x2160",
        url: "https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/hi.jpg",
      },
      {
        label: "750x1334",
        url: "https://esosslfiles-a.akamaihd.net/ape/uploads/2025/08/phone.jpg",
      },
    ])
  })

  test("returns empty when no resolution links present", () => {
    expect(parseResolutions("<p>nothing</p>")).toEqual([])
  })
})

describe("sanitizeFolderName", () => {
  test("keeps colons and unicode, replaces slashes, collapses whitespace", () => {
    expect(sanitizeFolderName("The Elder Scrolls Online: Necrom")).toBe(
      "The Elder Scrolls Online: Necrom"
    )
    expect(sanitizeFolderName("Spoils / Dangers")).toBe("Spoils - Dangers")
    expect(sanitizeFolderName("  Alik’r   Desert ")).toBe("Alik’r Desert")
  })
})
