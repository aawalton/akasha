import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { adele } from "akasha/alan/music/catalog/artist/pages/adele/adele.artist.ts"
import { composedEdit, WRITE } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const ROOT = akashaRoot()

const ADELE = `${artist.slug}/${adele.slug}` as const

test("a caller writing a page composes that page and hands the body to one change", () => {
  const edit = composedEdit(
    ROOT,
    "song",
    "page-editing-one",
    { title: "One", artist: ADELE, performed: true },
    sourceFor(ROOT)
  )
  expect(edit.at).toBe(WRITE)
})

test("a page that will not compose throws", () => {
  expect(() => composedEdit(ROOT, "no-such-page-type", "one", {}, sourceFor(ROOT))).toThrow(
    "went uncomposed"
  )
})
