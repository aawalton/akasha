import type { Finding } from "../finding.page-type.ts"

export const aBrokenReaderMakesAFalseCorrectionLookMeasured = {
  id: "01a06269-cf78-7c34-a574-5caac80ebf94",
  pageTypeSlug: "finding",
  slug: "a-broken-reader-makes-a-false-correction-look-measured",
  domainSlug: "domain/instrument",

  claim:
    "A correction checked with an instrument its checker wrote is only as sound as that instrument, and nothing checks the instrument. A reader whose character class excluded both quote characters halted at the first apostrophe in a double-quoted value and answered 197 of 2000 for a property holding 1987. The false correction that licensed would have been indistinguishable from a true one when sent.",
  evidence:
    "Measured 2026-09-02 on the akasha checkout. Another seat reported its new finding's evidence at 1987 characters. Checking that against `finding.page-type.ts:55`, which bars a property close to its limit, the first reader matched a string body with a character class excluding both quote characters. It halted at the first apostrophe inside a double-quoted value and answered claim 482/500, which was right, and evidence 197/2000, wrong by a factor of ten. A scanner honouring the opening quote character and backslash escapes, twenty lines rather than one expression, answered 1987/2000 to the character.\n\nNothing in the broken run looked broken. It ran, answered both properties, got one of them right, and exited 0.\n\nWhat halted the false correction was not rigour. 197 against 1987 is a dropped digit, the likeliest transcription error there is, so the instrument was doubted rather than the page. Had the true value been 1450, the broken reader would have answered some unremarkable number and the correction would have gone out as a measurement, against a page filed four minutes earlier.\n\nThis defeats the cheapest rule in use: that the call which would refute you is cheaper than the message asserting you. A refuting call can be wrong, and it reports nothing when it is.\n\nSame shape as a gate handed one expression for both arguments. `renderPopulationBound(examined, examined, unit)` cannot report a shortfall, and on 2026-09-02, 11 of its 21 calls under `temper/shared-build-deploy-checks/src/` were handed one variable twice. An instrument that cannot fail and an instrument nobody checked answer alike.\n\nThe guard is cheap and was not taken: run the reader over a value of known length first.",
} as const satisfies Finding
