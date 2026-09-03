import type { CarModel } from "../car-model.page-type.ts"

export const rivianR2 = {
  id: "019e4afb-b2ac-70ee-abc4-e1b11fcae768",
  pageTypeSlug: "car-model",
  slug: "rivian-r2",
  title: "R2",
  bodyStyle: "suv",
  generation: "Gen 1 (R2 platform, smaller skateboard derived from R1 Gen 2)",
  modelYearsAvailable: "2026",
  overview:
    "The Rivian R2 is a five-passenger, two-row compact electric SUV — Rivian's third production model and its first vehicle on the smaller, lower-cost R2 platform. Launched in Spring 2026 with the R2 Performance Dual-Motor trim ($57,990). Built around an 87.9 kWh usable (~94 kWh gross) liquid-cooled NMCA pack and a 400-volt architecture; native NACS charge port from launch. Performance: 656 hp, 609 lb-ft, 3.5 s 0-60, 330 mi EPA range, DC fast charging up to 210 kW with 10-80% in ~29 minutes. Targeted at the Tesla Model Y / Hyundai Ioniq 5 / Ford Mustang Mach-E segment but with Rivian's adventure-styling and 9.6 in ground clearance. Rivian R2 Premium ($53,990, 450 hp) is announced for late-2026; Standard RWD Long Range ($45k, 275+ mi) deferred to 2027 — neither is on sale yet as of 2026-05-21. Sources: https://rivian.com/r2 ; https://insideevs.com/news/789597/rivian-r2-launch-pricing-specs-2026/ ; https://en.wikipedia.org/wiki/Rivian_R2 ; https://www.cnbc.com/2026/03/12/rivian-r2-ev-launch.html",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://rivian.com/r2\n- https://en.wikipedia.org/wiki/Rivian_R2\n- https://insideevs.com/news/789597/rivian-r2-launch-pricing-specs-2026/\n- https://www.cnbc.com/2026/03/12/rivian-r2-ev-launch.html\n- https://www.rivianwave.com/news/3782/rivian-r2-standard-premium-and-performance-compare-prices-and-specs\n- https://www.kbb.com/rivian/r2/\n- https://www.consumerreports.org/cars/rivian/r2/2026/road-test-report/",
  exclusionReason: "All years excluded",
  carMakeSlug: "rivian",
} as const satisfies CarModel
