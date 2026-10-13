import { describe, expect, test } from "bun:test"
import {
  numberedOf,
  rotatedOf,
  shoutedOf,
  smallCapsOf,
  unjumbledOf,
} from "akasha/story/chapter/narration/modules/words/narration-words.module.code.ts"

describe("rotatedOf", () => {
  test("a line written upside down is said in ordinary letters", () => {
    expect(
      rotatedOf(
        "Sɐʇɐɹ: ˥ǝʍpbnᴉll¿ ∀ɹǝ ʎon sʇᴉll ʇɥǝɹǝ¿ Is ʇɥᴉs ʇɥǝ ∀ɹɯoɹǝp Qnǝǝu oɟ ʇɥǝ ∀uʇᴉuᴉnɯ¿ I’p lᴉʞǝ ʇo ɐsʞ ɐqonʇ ʇɥǝ ɥᴉsʇoɹʎ ɐ ɯoɯǝuʇ˙ ┴ɥᴉs ᴉs Sɐʇɐɹ Sᴉlʌǝɹɟɐuƃ’ ]Hᴉsʇoɹᴉɐu oɟ ʇɥǝ Moɹlp[˙"
      )
    ).toBe(
      "Satar: Lewdquill? Are you still there? Is this the Armored Queen of the Antinium? I’d like to ask about the history a moment. This is Satar Silverfang’ [Historian of the World]."
    )
  })

  test("a line in ordinary letters, or with one turned letter, is left as written", () => {
    expect(rotatedOf("Pump the bun, quid.")).toBe("Pump the bun, quid.")
    expect(rotatedOf("The schwa ǝ is a turned e, said in a quid pro quo.")).toBe(
      "The schwa ǝ is a turned e, said in a quid pro quo."
    )
  })
})

describe("smallCapsOf", () => {
  test("a line in small capitals is said in ordinary letters, capitalised where a sentence opens", () => {
    expect(smallCapsOf("“ᴇɴᴏᴜɢʜ! ʜᴇᴇᴅ ᴍᴇ, ᴘᴇᴏᴘʟᴇ ᴏꜰ ɢᴏᴅ. ɪ ᴡᴀꜱ ꜱᴇɴᴛ.”")).toBe(
      "“Enough! Heed me, people of god. I was sent.”"
    )
  })

  test("small capitals after a capital, with plain letters, an ғ and a hooked o, are said plain", () => {
    expect(smallCapsOf("Tʜɪs Dᴇᴀᴛʜ ᴡᴀs ᴏ̨ᴜɪᴛᴇ ɪᴄᴏɴɪᴄ: ᴀ sᴋᴜʟʟ ғʀᴀᴍᴇᴅ, Kᴀsɪɢɴᴀ’s ᴇxɪsᴛᴇɴᴄᴇ.")).toBe(
      "This Death was quite iconic: a skull framed, Kasigna’s existence."
    )
  })

  test("a line in ordinary letters is left as written", () => {
    expect(smallCapsOf("Death waited there, scythe in hand.")).toBe(
      "Death waited there, scythe in hand."
    )
  })
})

describe("unjumbledOf", () => {
  test("a word in jumbled case keeps its first letter and lowers the rest", () => {
    expect(unjumbledOf("“WhAt is ThERe? You are an AbErAtiOn. iDiOt. YOu. rEFuSe!”")).toBe(
      "“What is There? You are an Aberation. idiot. You. refuse!”"
    )
  })

  test("names joined in capitals, brands, units and plural acronyms are left as written", () => {
    expect(
      unjumbledOf(
        "BlackMage, YouTube, McDonald's, iPhone, Az'Kerash, d'Artien, twinTrouble, pH, NPCs, PhD"
      )
    ).toBe(
      "BlackMage, YouTube, McDonald's, iPhone, Az'Kerash, d'Artien, twinTrouble, pH, NPCs, PhD"
    )
  })

  test("a run of words joined without spaces and markup are left as written", () => {
    expect(unjumbledOf("IquitthefightIapologize and [KiLl](/k/) KiLl")).toBe(
      "IquitthefightIapologize and [KiLl](/k/) Kill"
    )
  })
})

describe("shoutedOf", () => {
  test("a shouted word of four letters or more is said as the word, stressed", () => {
    expect(shoutedOf("THE GOBLINS DON’T STOP. Level UP!")).toBe(
      "[the](+2) [goblins](+2) [don't](+2) [stop](+2). Level [up](+2)!"
    )
  })

  test("a short capital word the voice would spell as a name's letters is said as the word", () => {
    expect(shoutedOf("SIR, US, OUR, MY and WHY")).toBe(
      "[sir](+2), [us](+2), [our](+2), [my](+2) and [why](+2)"
    )
  })

  test("an acronym, a numeral, a vowelless word and markup are left as written", () => {
    expect(shoutedOf("TV, PM, USA, GSNF, XIV, I, [YLAWES](/ilˈɑwɛs/) and [Shh](/ʃː/)")).toBe(
      "TV, PM, USA, GSNF, XIV, I, [YLAWES](/ilˈɑwɛs/) and [Shh](/ʃː/)"
    )
  })
})

describe("numberedOf", () => {
  test("a numeral after a name is said as an ordinal", () => {
    expect(numberedOf("King Itorin II met Othius IV and the Grimalkin II's crew.")).toBe(
      "King Itorin the Second met Othius the Fourth and the Grimalkin the Second's crew."
    )
  })

  test("a numeral after a counting word is said as a number", () => {
    expect(numberedOf("World War II, Episode III and Mk. VII armor.")).toBe(
      "World War Two, Episode Three and Mk. Seven armor."
    )
  })

  test("a lone capital, a lowercase word and a single letter are left as written", () => {
    expect(numberedOf("I II, and II, Viscount V, Merchant X, ARMY II.")).toBe(
      "I II, and II, Viscount V, Merchant X, ARMY II."
    )
  })
})
