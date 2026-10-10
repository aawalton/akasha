import { describe, expect, test } from "bun:test"
import { homographsOf } from "akasha/story/chapter/narration/modules/homographs/narration-homographs.module.code.ts"

describe("homographsOf", () => {
  test("eye contact is stressed on eye, as one compound", () => {
    expect(homographsOf("She made eye contact. Eye-contact. The contact was brief.")).toBe(
      "She made eye [contact](/kˌɑntækt/). Eye-[contact](/kˌɑntækt/). The contact was brief."
    )
  })

  test("refuse before to, or opening an order, is the verb, and refuse as rubbish is left", () => {
    expect(
      homographsOf(
        "Refuse, and they will die. A Treant refuse to vanish. “Refuse!” A pile of refuse."
      )
    ).toBe(
      "[Refuse](/ɹəfjˈuz/), and they will die. A Treant [refuse](/ɹəfjˈuz/) to vanish. “[Refuse](/ɹəfjˈuz/)!” A pile of refuse."
    )
  })

  test("em after an apostrophe or opening quote is them, and em alone is left", () => {
    expect(homographsOf("Let ‘em lie. Got ’em! Tell 'em. An em dash.")).toBe(
      "Let ‘[em](/əm/) lie. Got ’[em](/əm/)! Tell '[em](/əm/). An em dash."
    )
  })

  test("tears in the eyes or streaming are crying, and tears at or in half are left", () => {
    expect(
      homographsOf(
        "She turned, tears in her eyes. Tears streaming from his eyes. She tears at the meat. It tears in half."
      )
    ).toBe(
      "She turned, [tears](/tˈɪɹz/) in her eyes. [Tears](/tˈɪɹz/) streaming from his eyes. She tears at the meat. It tears in half."
    )
  })

  test("a tear ripped is told from a tear cried by the words beside it", () => {
    expect(
      homographsOf(
        "Wear and tear. He was on a tear. Claws tear at him. A tear in the cloth. She felt sinews tear. Made her tear up. A tear in her eyes. Shed a tear at that."
      )
    ).toBe(
      "Wear and [tear](/tˈɛɹ/). He was on a [tear](/tˈɛɹ/). Claws [tear](/tˈɛɹ/) at him. A [tear](/tˈɛɹ/) in the cloth. She felt sinews [tear](/tˈɛɹ/). Made her [tear](/tˈɪɹ/) up. A tear in her eyes. Shed a tear at that."
    )
  })

  test("legged it is one syllable, and legged otherwise is left", () => {
    expect(homographsOf("He legged it. A four-legged beast.")).toBe(
      "He [legged](/lˈɛɡd/) it. A four-legged beast."
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

  test("a bow given, taken, returned or met as a greeting bends, as does a ship's bow", () => {
    expect(
      homographsOf(
        "She gave Colfa a very proper bow. Visophecin swept the Unicorn a bow. She took a bow. The Drake returned their bows. Then he turned to bow. Venaz roared from the bow of the ship. Over the port bow, a sail."
      )
    ).toBe(
      "She gave Colfa a very proper [bow](/bˈW/). Visophecin swept the Unicorn a [bow](/bˈW/). She took a [bow](/bˈW/). The Drake returned their [bows](/bˈWz/). Then he turned to [bow](/bˈW/). Venaz roared from the [bow](/bˈW/) of the ship. Over the port [bow](/bˈW/), a sail."
    )
  })

  test("a bow held, aimed or carried beside other arms is the weapon", () => {
    expect(
      homographsOf(
        "Bird waited there, bow in hand. She aimed her bow up. They swung their bows up. With sword and bow. A bow and arrows. Jerci managed to aim a bow."
      )
    ).toBe(
      "Bird waited there, [bow](/bˈO/) in hand. She aimed her [bow](/bˈO/) up. They swung their [bows](/bˈOz/) up. With sword and [bow](/bˈO/). A [bow](/bˈO/) and arrows. Jerci managed to aim a bow."
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

  test("used to a short gerund and content after an adverb are read as their sense", () => {
    expect(
      homographsOf("Erin wasn't used to using it. She looked bitterly content, the only content.")
    ).toBe(
      "Erin wasn't [used](/jˈust/) to using it. She looked bitterly [content](/kəntˈɛnt/), the only content."
    )
  })

  test("markup already handed on is left whole", () => {
    expect(homographsOf("A [dove](/x/) and [Klbkch](/kˈɪlbkɪʧ/) took a bow.")).toBe(
      "A [dove](/x/) and [Klbkch](/kˈɪlbkɪʧ/) took a [bow](/bˈW/)."
    )
  })
})
