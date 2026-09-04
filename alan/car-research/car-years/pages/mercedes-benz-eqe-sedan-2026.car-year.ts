import type { CarYear } from "../car-year.page-type.ts"

export const mercedesBenzEqeSedan2026 = {
  id: "019e4af2-14a4-776f-b48b-98787a1d54a1",
  pageTypeSlug: "car-year",
  slug: "mercedes-benz-eqe-sedan-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 sees base output increased from 288 hp to 315 hp on EQE 320+ and 4MATIC trims (Mercedes refresh nomenclature). Native NACS adapter included. Lineup simplification dropping EQE 500 4MATIC. AMG EQE continues. Sources: https://www.mbusa.com/en/vehicles/model/eqe/sedan/amgeqev4 ; https://www.autohausonedens.com/research/eqe-sedan-trims/",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/eqe/sedan/amgeqev4\n- https://www.autohausonedens.com/research/eqe-sedan-trims/",
  exclusionReason: "All trims excluded",
  carModelSlug: "mercedes-benz-eqe-sedan",
} as const satisfies CarYear
