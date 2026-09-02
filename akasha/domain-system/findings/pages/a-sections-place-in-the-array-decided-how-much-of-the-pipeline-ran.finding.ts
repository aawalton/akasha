import type { Finding } from "../finding.page-type.ts"

export const aSectionsPlaceInTheArrayDecidedHowMuchOfThePipelineRan = {
  id: "01a061e6-6cf1-794c-a6e4-7f8a7c4e26d5",
  pageTypeSlug: "finding",
  slug: "a-sections-place-in-the-array-decided-how-much-of-the-pipeline-ran",
  domainSlug: "domain/temper",
  claim:
    "Sections whose writes are all built into one array before any is awaited end at the first section that throws, so a section's place in that array decides how much of the pipeline runs. A throw seeded into the 2nd of the addon-data pipeline's 12 sections left 2 of 62 files handed to the writer and 0 of 14 mapping generators constructed. The live throw sat in the 12th, which is the only reason 44 files emitted.",
  evidence:
    "Measured 2026-09-02 through the real sections and a capturing writer, in `tools/lib/temper-addon-data/`.\n\n`writes.ts:44` was `ADDON_DATA_SECTIONS.flatMap(([name, build]) => build(p, w))`. Each `build` runs synchronously and hands back promises already in flight, so a synchronous throw inside one leaves `flatMap` and every later entry uncalled. `generate.ts:18-21` held that spread and `buildMappingGeneratorWrites()` in one array literal, evaluated left to right, and `mapping-generators.ts` called every `generate()` eagerly.\n\nA throw seeded into `equipment`, the 2nd of 12 sections, on the earlier shape: 1 of 12 sections reached the writer, 2 of 62 files were handed over, 0 of 14 mapping generators were constructed. The same throw seeded into `skills`, the 12th and last, handed over 43. The live defect was one generator deep inside `skills`, so 44 emitted and 44 was read as a total. The place in the array, rather than the size of the defect, set that number.\n\nMended in `failing-alone.ts`, holding one statement of two guards. `rendered` wraps a render so a throwing generator rejects its own file alone. `built` wraps a section so a throwing section rejects itself alone. Both re-raise naming the file or the section, so a run that loses something says which thing it lost. On the mended shape the same seed in `equipment` gives 11 of 12 sections, 50 of 62 files, 14 of 14 mapping generators, and one rejection reading `the equipment section wrote nothing`. With nothing seeded, 62 of 62 either way.\n\nEvery seed was checked to have removed the thing it names before its result was trusted.",
} as const satisfies Finding
