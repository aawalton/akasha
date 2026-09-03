import type { CarModel } from "../car-model.page-type.ts"

export const subaruForesterHybrid = {
  id: "019e4af7-1aa0-7dd7-bc98-8298d899a443",
  pageTypeSlug: "car-model",
  slug: "subaru-forester-hybrid",
  title: "Forester Hybrid",
  bodyStyle: "suv",
  generation: "6th gen Forester (SK successor, MY2025+) with next-gen Toyota-derived hybrid",
  modelYearsAvailable: "2025, 2026",
  overview:
    "All-new for MY2025, the Forester Hybrid is the first hybrid version of Subarus best-selling Forester compact SUV. It uses a next-generation Subaru hybrid system that pairs a 2.5L Atkinson/Miller-cycle SUBARU BOXER engine with electric motors driving Symmetrical AWD via a CVT, total system output 194 hp. EPA-estimated up to 581 miles total range and ~40% better city fuel economy versus the gas Forester [https://www.subaru.com/vehicles/forester/hybrid/2026.html]. Available in Premium, Sport, Limited, and Touring trims. It is NOT a plug-in hybrid; no external charging required. Launch announcement: https://media.subaru.com/pressrelease/2279/1/subaru-introduces-all-new-2025-forester-hybrid-next. The Toyota Hybrid System foundation has long-established reliability although Subaru-specific long-term data is limited at this early stage.",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.subaru.com/vehicles/forester/hybrid/2026.html\n- https://media.subaru.com/pressrelease/2279/1/subaru-introduces-all-new-2025-forester-hybrid-next\n- https://media.subaru.com/pressrelease/2280/1/subaru-announces-pricing-new-2025-subaru-forester-hybrid\n- https://media.subaru.com/newsrelease.do?id=2424\n- https://www.edmunds.com/subaru/forester/2025/hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "subaru",
} as const satisfies CarModel
