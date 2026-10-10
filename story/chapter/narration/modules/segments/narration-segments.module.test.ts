import { describe, expect, test } from "bun:test"
import {
  narrationSegmentsOf,
  sentencesOf,
} from "akasha/story/chapter/narration/modules/segments/narration-segments.module.code.ts"

const texts = (prose: string): string[] => narrationSegmentsOf(prose).map((one) => one.text)

describe("narrationSegmentsOf", () => {
  test("a chapter with no words has no segment", () => {
    expect(narrationSegmentsOf("\n\n  \n")).toEqual([])
  })

  test("the first segment is the first sentence alone, and a short paragraph runs on into the next", () => {
    expect(narrationSegmentsOf("She ran. The door shut. It was dark.\nShe waited.")).toEqual([
      { text: "She ran.", pauseAfterMs: 150, wordStart: 0 },
      { text: "The door shut. It was dark. She waited.", pauseAfterMs: 900, wordStart: 2 },
    ])
  })

  test("a paragraph of a hundred characters or more ends its segment, with a paragraph's pause", () => {
    const long =
      "The rain had not stopped for three days, and the river kept rising past the old mill."
    expect(narrationSegmentsOf(`Start.\n${long} ${long}\nShe waited.`)).toEqual([
      { text: "Start.", pauseAfterMs: 450, wordStart: 0 },
      { text: `${long} ${long}`, pauseAfterMs: 450, wordStart: 1 },
      { text: "She waited.", pauseAfterMs: 900, wordStart: 35 },
    ])
  })

  test("a segment never runs past its limit and keeps whole sentences", () => {
    const sentence = "The rain had not stopped for three days and the river kept rising."
    const paragraph = Array.from({ length: 30 }, () => sentence).join(" ")
    const segments = texts(`Start.\n${paragraph}`)
    expect(segments.every((one) => one.length <= 350)).toBe(true)
    expect(segments.slice(1).every((one) => one.endsWith("rising."))).toBe(true)
    expect(segments.slice(1).join(" ")).toBe(paragraph)
  })

  test("a sentence longer than the limit is cut before the limit", () => {
    const long = `${"word ".repeat(150)}and then, ${"more ".repeat(10)}done.`
    const segments = texts(`Start.\n${long}`)
    expect(segments.length).toBeGreaterThan(2)
    expect(segments.every((one) => one.length <= 350)).toBe(true)
  })

  test("a scene break and a heading each leave a longer pause", () => {
    expect(narrationSegmentsOf("One.\n\n***\n\nTwo.\n## Part Two\nThree.")).toEqual([
      { text: "One.", pauseAfterMs: 900, wordStart: 0 },
      { text: "Two.", pauseAfterMs: 900, wordStart: 2 },
      { text: "Part Two.", pauseAfterMs: 900, wordStart: 3 },
      { text: "Three.", pauseAfterMs: 900, wordStart: 6 },
    ])
  })

  test("markdown is said as the words it marks", () => {
    expect(
      texts("Start.\n**The Tower**\nShe *really* meant it, [truly](https://x.y) and `fully`.")
    ).toEqual(["Start.", "The Tower. She really meant it, truly and fully."])
  })

  test("a window is said as plain sentences between longer pauses", () => {
    expect(
      narrationSegmentsOf("She looked.\n\n:::skill\nname: Devotion\n:::\n\nShe smiled.")
    ).toEqual([
      { text: "She looked.", pauseAfterMs: 900, wordStart: 0 },
      { text: "New skill: Devotion.", pauseAfterMs: 900, wordStart: 2 },
      { text: "She smiled.", pauseAfterMs: 900, wordStart: 6 },
    ])
  })

  test("a segment starts at the count of the prose's own words before it", () => {
    const sentence = "The rain had not stopped for three days and the river kept rising."
    const prose = `Start.\n${Array.from({ length: 30 }, () => sentence).join(" ")}\nEnd.`
    const starts = narrationSegmentsOf(prose).map((one) => one.wordStart)
    expect(starts).toEqual([...starts].sort((a, b) => a - b))
    expect(starts.at(-1)).toBe(prose.split(/\s+/).length - 1)
    expect(starts.slice(1, -1).every((one) => (one - 1) % 13 === 0)).toBe(true)
  })

  test("a fenced screen is said one line at a time", () => {
    expect(
      texts("She read it.\n```stat-screen\n[SKILL ACQUIRED]\nType: Passive\n```\nDone.")
    ).toEqual(["She read it.", "Skill Acquired. Type: Passive.", "Done."])
  })

  test("a line of only marks is a scene break and never spoken", () => {
    const breaks = ["—--", "——", "—————", "◈◈◈", "<<<<<>>>>>", "***​", "→", "+"]
    const prose = ["One.", ...breaks.flatMap((mark, at) => [mark, `Line ${at}.`])].join("\n")
    const segments = narrationSegmentsOf(prose)
    expect(segments.map((one) => one.text)).toEqual([
      "One.",
      ...breaks.map((_mark, at) => `Line ${at}.`),
    ])
    expect(segments.every((one) => one.pauseAfterMs === 900)).toBe(true)
  })

  test("a line of only an ellipsis or a silent reply is a pause rather than a break", () => {
    const segments = narrationSegmentsOf("She waited.\n“…”\n. . .\nHe left.")
    expect(segments.map(({ text, pauseAfterMs }) => ({ text, pauseAfterMs }))).toEqual([
      { text: "She waited.", pauseAfterMs: 450 },
      { text: "He left.", pauseAfterMs: 900 },
    ])
  })

  test("a run of dashes inside a line is said as a comma", () => {
    expect(
      texts("Start.\nThat meant duels through the city -- when both sides were honorable——or not.")
    ).toEqual([
      "Start.",
      "That meant duels through the city, when both sides were honorable, or not.",
    ])
  })

  test("a link, an image placeholder, an entity and a hidden character are never spoken", () => {
    expect(
      texts(
        "Start.\neBook: https://www.royalroad.com/amazon/B0DSVBKLP9\nTom &amp; Jerry [image] left​ &#8212; fast."
      )
    ).toEqual(["Start.", "eBook. Tom & Jerry left — fast."])
  })

  test("a link glued to a word and a lone ellipsis in a paragraph are never spoken", () => {
    expect(texts("Start.\nChapter 33: Finally, Sleephttps://x.y/z\nHe stopped. …")).toEqual([
      "Start.",
      "Chapter 33: Finally, Sleep. He stopped.",
    ])
  })

  test("square brackets are dropped and their words kept, since the voice reads brackets as markup", () => {
    expect(texts("Start.\nAnother [Guard]’s time, and the [Priest] didn’t care.")).toEqual([
      "Start.",
      "Another Guard's time, and the Priest didn't care.",
    ])
  })

  test("any apostrophe between two letters is said as one", () => {
    expect(texts("Start.\nI don`t, can´t, won′t, isnʼt or Tom‘s.")).toEqual([
      "Start.",
      "I don't, can't, won't, isn't or Tom's.",
    ])
  })

  test("an ellipsis between two words leaves them two words", () => {
    expect(texts("Start.\nI do…no, I don't...really.")).toEqual([
      "Start.",
      "I do… no, I don't... really.",
    ])
  })

  test("a pronounced word is said as respelled, whole and in the case written", () => {
    const pronounced = [{ written: "Mrsha", spokenAs: "Mersha" }]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(said("Start.\nMrsha's friend, Mrshas and mrsha saw Mrsha and Mrshaz.")).toEqual([
      "Start.",
      "Mersha's friend, Mershas and mrsha saw Mersha and Mrshaz.",
    ])
    expect(said("Start.\n\n:::skill\nname: Mrsha's Luck\n:::\n")).toEqual([
      "Start.",
      "New skill: Mersha's Luck.",
    ])
  })

  test("a pronounced word stating phonemes is marked up with them, whole and in the case written", () => {
    const pronounced = [
      { written: "Oteslia", spokenAs: "Oh-tess-lia", phonemes: "ˌOtˈɛsliə" },
      { written: "Klbkch", phonemes: "kˈɪlbkɪʧ" },
      { written: "Nobody", phonemes: "" },
      { written: "Nothing" },
    ]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(
      said("Start.\nKlbkch's road to Oteslia, not oteslia or Otesliana. Nobody saw Nothing.")
    ).toEqual([
      "Start.",
      "[Klbkch's](/kˈɪlbkɪʧᵻz/) road to [Oteslia](/ˌOtˈɛsliə/), not oteslia or Otesliana. Nobody saw Nothing.",
    ])
  })

  test("a pronounced word with an ending is marked up whole, the ending's sound following the word's last sound", () => {
    const pronounced = [
      { written: "Ylawes", phonemes: "ilˈɑwɛs" },
      { written: "Ksmvr", phonemes: "kˈɪsmvəɹ" },
      { written: "Colth", phonemes: "kˈOlθ" },
      { written: "Klbkch", phonemes: "kˈɪlbkɪʧ" },
      { written: "Klb", phonemes: "kˈɪlb" },
      { written: "Xrn", phonemes: "zˈɜɹn" },
    ]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(
      said("Start.\nYlawes’s Ksmvrs met Colth's Klbkches and the Klbkchs' Klbs; Xrned, Xrning.")
    ).toEqual([
      "Start.",
      "[Ylawes's](/ilˈɑwɛsᵻz/) [Ksmvrs](/kˈɪsmvəɹz/) met [Colth's](/kˈOlθs/) [Klbkches](/kˈɪlbkɪʧᵻz/) and the [Klbkchs'](/kˈɪlbkɪʧᵻz/) [Klbs](/kˈɪlbz/); [Xrned](/zˈɜɹnd/), [Xrning](/zˈɜɹnɪŋ/).",
    ])
  })

  test("a pronounced word ending in e reaches its d and its ing, and a page for that form wins", () => {
    const pronounced = [
      { written: "conjure", phonemes: "kˈɑnʤəɹ" },
      { written: "bake", phonemes: "bˈAk" },
      { written: "baked", phonemes: "bˈɛkt" },
      { written: "Durene", spokenAs: "Dureen" },
    ]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(
      said("Start.\nShe conjured, CONJURING it; Conjured. He baked, baking. Durened Durening.")
    ).toEqual([
      "Start.",
      "She [conjured](/kˈɑnʤəɹd/), [CONJURING](/kˈɑnʤəɹɪŋ/) it; [Conjured](/kˈɑnʤəɹd/). He [baked](/bˈɛkt/), [baking](/bˈAkɪŋ/). Dureend Dureening.",
    ])
  })

  test("a pronunciation written in small letters reaches the word capitalised and in capitals too, and the later of two wins", () => {
    const pronounced = [
      { written: "gnoll", phonemes: "nˈɑl" },
      { written: "gnoll", phonemes: "nˈOl" },
      { written: "drake", spokenAs: "draik" },
      { written: "bow", phonemes: "bˈO" },
    ]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(
      said("Start.\nGnolls and a gnoll; GNOLL! Drake saw a drake. gNoLL stays, and he took a bow.")
    ).toEqual([
      "Start.",
      "[Gnolls](/nˈOlz/) and a [gnoll](/nˈOl/); [GNOLL](/nˈOl/)! Draik saw a draik. [gnoll](/nˈOl/) stays, and he took a [bow](/bˈW/).",
    ])
  })

  test("a pronounced word shouted in capitals keeps its pronunciation, and other shouted words are stressed", () => {
    const pronounced = [
      { written: "Ylawes", phonemes: "ilˈɑwɛs" },
      { written: "Mrsha", spokenAs: "Mersha" },
    ]
    const said = (prose: string): string[] =>
      narrationSegmentsOf(prose, pronounced).map((one) => one.text)
    expect(said("Start.\n“YLAWES’S SWORD! MRSHA, WAIT!”")).toEqual([
      "Start.",
      "“[YLAWES'S](/ilˈɑwɛsᵻz/) [sword](+2)! [mersha](+2), [wait](+2)!”",
    ])
  })

  test("a word broken off before its vowel is said with one", () => {
    expect(texts("Start.\n“Wh—” She stopped. “Th... that’s it. Str– no.”")).toEqual([
      "Start.",
      "“Whuh—” She stopped. “Thuh... that's it. Struh– no.”",
    ])
  })

  test("a sound with no vowel and a whole word are said as written, and a stutter as a sound", () => {
    expect(texts("Start.\n“Hmm… Shh—” N-no, Mr. Brt went to St. Ives.")).toEqual([
      "Start.",
      "“Hmm… [Shh](/ʃː/)—” [N](/nə/) no, Mr. Brt went to St. Ives.",
    ])
  })

  test("the same chapter always gives the same segments", () => {
    const prose = "One. Two.\n\n***\n\n:::level-up\nlevel: 2\n:::\nThree."
    expect(narrationSegmentsOf(prose)).toEqual(narrationSegmentsOf(prose))
  })
})

describe("sentencesOf", () => {
  test("a title or an initial ends no sentence", () => {
    expect(
      sentencesOf("Mr. Hale met Dr. Ruiz on St. Anne's Street. J. R. waved, e.g. twice.")
    ).toEqual(["Mr. Hale met Dr. Ruiz on St. Anne's Street.", "J. R. waved, e.g. twice."])
  })

  test("a part named Pt. ends no sentence", () => {
    expect(sentencesOf("Go to Interlude – Hectval Pt. 2 and find it. Then rest.")).toEqual([
      "Go to Interlude – Hectval Pt. 2 and find it.",
      "Then rest.",
    ])
  })

  test("a closing quote stays with its sentence", () => {
    expect(sentencesOf("“Run!” she said. “Now.” He ran.")).toEqual([
      "“Run!” she said.",
      "“Now.”",
      "He ran.",
    ])
  })
})
