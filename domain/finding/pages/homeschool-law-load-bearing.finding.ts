import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const homeschoolLawLoadBearing = {
  id: "01a06555-9f3e-7489-b4da-a8889e7c6098",
  type: "page-type/finding",
  slug: "homeschool-law-load-bearing",
  domain: "alan-book/all-about-alan",
  claim:
    "Utah's homeschool law is the only B Alan holds anywhere in what he depends on from a government, and it is load-bearing: it carries the household's education strategy and it is one of the things tying the family to Provo. He records that the B rests on the current legislature rather than on anything that would survive it changing, and that what he watches for is the law being worn away. Nobody watches. No cadence is set, no session is tracked, and nothing says where a draft bill would be noticed or by whom.",
  evidence:
    'Read across `alan/book/pages/all-about-alan/topic/pages/` and `.../question/pages/`.\n\n`the-law-that-lets-us-homeschool`: "Utah wrote its homeschool law friendly. One notice of intent a year is the whole of it. No curriculum to get approved, no testing, no qualification asked of me as a parent." Then the grade: "So it earns a **B, the only one anywhere in what I depend on from a government**." Then the exposure: "The B is in the current legislature rather than in anything that would hold if the legislature changed. What I watch for is the law being worn away."\n\n`where-the-government-touches-me` puts it against the rest: "Registering the homeschooling is the only good one." `what-i-keep-because-it-means-something` and `the-five-of-us` carry the tie to Provo — "Five people tie us to this house… They tie us to Provo as well."\n\nWhat is missing is the watching. The page says what he watches for and never how. No cadence, no legislative session named, no place an answer would land, and no question asks for one. `who-builds-the-watcher-on-filings` is the nearest thing and it is about companies changing hands, not about bills.\n\nNot measured: I checked no Utah statute and no legislative calendar, so the law as described is the book\'s account. That nobody watches is what the absence of any mechanism implies, not a statement Alan has made.',
} as const satisfies Finding
