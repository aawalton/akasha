import type { CarModel } from "../car-model.page-type.ts"

export const lamborghiniTemerario = {
  id: "019e4ae5-035a-71ee-8e44-c7f5cf42c6a9",
  pageTypeSlug: "car-model",
  slug: "lamborghini-temerario",
  title: "Temerario",
  bodyStyle: "coupe",
  generation: "1st gen (replaces Huracán)",
  modelYearsAvailable: "2026",
  overview:
    'The **Temerario** is Lamborghini\'s V10-successor in the entry-supercar slot, replacing the Huracán for MY2026. It is the first Lamborghini super sports car with a V8 engine: an all-new 4.0L (3,995 cc) flat-plane twin-turbo "hot-vee" V8 that revs to 10,000 rpm, paired with three electric motors (two front-axle for AWD torque vectoring, one integrated with the 8-speed DCT) and a 3.8 kWh battery. Combined output is 907 hp (920 CV) / 730 N·m. 0-62 mph in 2.7 s. US deliveries commenced January 2026. The Temerario is offered as a single base trim plus the optional **Alleggerita** lightweight package (carbon-fiber bodywork, titanium exhaust, lightweight seats, -55 lb, +67% downforce, ~$75K). Like the Revuelto, EV-only range is minimal (~5-6 miles estimated) — the hybrid system is engineered for performance and emissions rather than commuting on electric power. Sources: https://www.lamborghini.com/en-en/models/temerario , https://en.wikipedia.org/wiki/Lamborghini_Temerario , https://www.edmunds.com/lamborghini/temerario/',
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "1. https://www.lamborghini.com/en-en/models/temerario — official\n2. https://en.wikipedia.org/wiki/Lamborghini_Temerario\n3. https://www.edmunds.com/lamborghini/temerario/\n4. https://www.kbb.com/lamborghini/temerario/\n5. https://carbuzz.com/2026-lamborghini-temerario-first-drive-review/\n6. https://www.topgear.com/car-reviews/lamborghini/temerario\n7. https://www.autoevolution.com/news/lamborghini-finally-kicks-off-temerario-deliveries-lightweight-alleggerita-also-available-263069.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "lamborghini",
} as const satisfies CarModel
