import { describe, expect, test } from "bun:test"
import { soundedOf } from "akasha/story/chapter/narration/modules/sounds/narration-sounds.module.code.ts"

describe("soundedOf", () => {
  test("a word broken off before its vowel is said with one", () => {
    expect(soundedOf("“Wh—” She stopped. “Th... that’s it. Str– no.”")).toBe(
      "“Whuh—” She stopped. “Thuh... that’s it. Struh– no.”"
    )
  })

  test("a sound with no vowel broken off is given no added uh", () => {
    expect(soundedOf("“Hmm… Tsk... Ngh—”")).toBe("“Hmm… Tsk... Ngh—”")
  })

  test("a grunt the voice would spell out is handed on as its sound", () => {
    expect(soundedOf("“Hrrr. Shh— Hmph, mhm. Psh! Brr.” Mr. Brt, GSNF, Nrr.")).toBe(
      "“[Hrrr](/hɜːɹ/). [Shh](/ʃː/)— [Hmph](/hmf/), [mhm](/mhm/). [Psh](/pʃː/)! [Brr](/bɜːɹ/).” Mr. Brt, GSNF, Nrr."
    )
  })

  test("a stutter is said as the sound the word opens with, never as a letter's name", () => {
    expect(soundedOf("“P-p-potion? W-What? Th-the C-Ceria, ch-chair, S-so.”")).toBe(
      "“[P](/pə/) [p](/pə/) potion? [W](/wə/) What? [Th](/ðə/) the [C](/sə/) Ceria, [ch](/ʧə/) chair, [S](/sə/) so.”"
    )
  })

  test("a word joined to another it does not open is left as written", () => {
    expect(soundedOf("I-I x-ray T-shirt so-so tsk-tsk Mm-hmm re-read half-b-baked")).toBe(
      "I-I x-ray T-shirt so-so tsk-tsk Mm-hmm re-read half-b-baked"
    )
  })

  test("a word spelled shm is handed on spelled schm, as the voice knows it", () => {
    expect(soundedOf("Shmooze, shmoozing, SHMOOZED, shmancy. Ash moved. Shhh.")).toBe(
      "Schmooze, schmoozing, SCHMOOZED, schmancy. Ash moved. [Shhh](/ʃː/)."
    )
  })

  test("a word in capitals broken off is given no added uh", () => {
    expect(soundedOf("“The TV— GPS... STOP— PG–” N— Wh—")).toBe(
      "“The TV— GPS... STOP— PG–” N— Whuh—"
    )
  })

  test("a word with a vowel is left as written", () => {
    expect(soundedOf("Mr. Brt went— away.")).toBe("Mr. Brt went— away.")
  })
})
