import { describe, expect, test } from "bun:test"
import { homographsOf } from "akasha/story/chapter/narration/modules/homographs/narration-homographs.module.code.ts"

describe("homographsOf", () => {
  test("a past tense misaki builds on the wrong stem is handed on as its own reading", () => {
    expect(homographsOf("He bowed. BOWED. Bowed low, she mended it.")).toBe(
      "He [bowed](/bˈWd/). [BOWED](/bˈWd/). [Bowed](/bˈWd/) low, she [mended](/mˈɛndᵻd/) it."
    )
  })

  test("dove after a name is the dive, and dove after an article is the bird", () => {
    expect(homographsOf("The Wyverns dove at the dove and a dove-tailed swallow.")).toBe(
      "The Wyverns [dove](/dˈOv/) at the dove and a dove-tailed swallow."
    )
  })

  test("a bow given as a greeting bends, and a bow held is the weapon", () => {
    expect(
      homographsOf(
        "She gave a slight bow and swept him a low bow. He raised his bow. He made a bow."
      )
    ).toBe(
      "She gave a slight [bow](/bˈW/) and swept him a low [bow](/bˈW/). He raised his bow. He made a bow."
    )
  })

  test("content as a feeling is stressed on its end, and content held is not", () => {
    expect(
      homographsOf("Gazi seemed content with that. She was content. The content was fine.")
    ).toBe(
      "Gazi seemed [content](/kəntˈɛnt/) with that. She was [content](/kəntˈɛnt/). The content was fine."
    )
  })

  test("used to a thing is said as accustomed, and used to do a thing is left", () => {
    expect(
      homographsOf(
        "Erin wasn't used to it. You get used to that. It was used to kill. He was used to bring water."
      )
    ).toBe(
      "Erin wasn't [used](/jˈust/) to it. You get [used](/jˈust/) to that. It was used to kill. He was used to bring water."
    )
  })

  test("wound around, present yourself and lead the metal are read by their context", () => {
    expect(
      homographsOf(
        "A scarf wound around her head; the wound around his chest. Present yourself! May I present Raekea? Balls of lead. He took the lead."
      )
    ).toBe(
      "A scarf [wound](/wˈWnd/) around her head; the wound around his chest. [Present](/pɹizˈɛnt/) yourself! May I [present](/pɹizˈɛnt/) Raekea? Balls of [lead](/lˈɛd/). He took the lead."
    )
  })

  test("markup already handed on is left whole", () => {
    expect(homographsOf("A [dove](/x/) and [Klbkch](/kˈɪlbkɪʧ/) bowed.")).toBe(
      "A [dove](/x/) and [Klbkch](/kˈɪlbkɪʧ/) [bowed](/bˈWd/)."
    )
  })
})
