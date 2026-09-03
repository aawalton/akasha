import type { CarModel } from "../car-model.page-type.ts"

export const polestarPolestar4 = {
  id: "019e4af3-059c-77ef-8905-d16f5c027b98",
  pageTypeSlug: "car-model",
  slug: "polestar-polestar-4",
  title: "Polestar 4",
  bodyStyle: "suv",
  generation: "1st gen (SEA / Geely Sustainable Experience Architecture)",
  modelYearsAvailable: "2026",
  overview:
    "The Polestar 4 is a battery-electric coupe-style SUV that slots between the Polestar 2 and Polestar 3. Sold in Europe/China since 2024, US sales officially opened in June 2025 as a MY26 vehicle, with deliveries beginning fall 2025. Notably built on Geely's SEA platform — initially China-built, but North American customer cars are being assembled in South Korea (Renault Korea's Busan plant) to sidestep US tariff exposure. Most distinctive design feature: no rear window — replaced by a roof-mounted high-resolution rear-view camera feed to a digital interior mirror. Offered in US as Long Range Single Motor (RWD), Long Range Dual Motor (AWD), and Dual Motor with Performance Pack. Sources: https://www.polestar.com/us/polestar-4/, https://electrek.co/2025/06/03/2026-polestar-4-officially-on-sale-us-priced-slightly-higher/, https://en.wikipedia.org/wiki/Polestar_4",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.polestar.com/us/polestar-4/\n- https://www.polestar.com/us/polestar-4/specifications/\n- https://electrek.co/2025/06/03/2026-polestar-4-officially-on-sale-us-priced-slightly-higher/\n- https://media.polestar.com/us/en/media/pressreleases/691453/2026-polestar-4-electric-performance-suv-coupe-now-on-sale-in-the-united-states\n- https://en.wikipedia.org/wiki/Polestar_4\n- https://www.edmunds.com/polestar/4/",
  exclusionReason: "All years excluded",
  carMakeSlug: "polestar",
} as const satisfies CarModel
