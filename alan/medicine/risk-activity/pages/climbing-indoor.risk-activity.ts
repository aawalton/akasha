import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const climbingIndoor = {
  id: "01a183ec-9550-723d-b72c-fe900ed8b39e",
  type: "page-type/risk-activity",
  slug: "climbing-indoor",
  exposureUnit: "per hour",
  micromortsPerUnitLow: 0.01,
  micromortsPerUnitCentral: 0.03,
  micromortsPerUnitHigh: 0.1,
  exposureAssumption:
    "No published death rate exists; it assumes about one US climbing-gym death a year. The death figure is not verified against a source read in full. Every disability duration is an assumption. These borrow the nearest GBD weight: Lower-limb fracture (ankle, calcaneus, foot, tibia); Upper-limb fracture (elbow, arm).",
  injuryDisability: [
    {
      injury: "Lower-limb fracture (ankle, calcaneus, foot, tibia)",
      injuriesPerMillionUnits: 10.7,
      disabilityWeight: 0.05,
      disabilityYears: 0.25,
    },
    {
      injury: "Vertebral fracture (incl. polytrauma)",
      injuriesPerMillionUnits: 5.3,
      disabilityWeight: 0.111,
      disabilityYears: 0.5,
    },
    {
      injury: "Shoulder dislocation",
      injuriesPerMillionUnits: 4,
      disabilityWeight: 0.062,
      disabilityYears: 0.15,
    },
    {
      injury: "Upper-limb fracture (elbow, arm)",
      injuriesPerMillionUnits: 4,
      disabilityWeight: 0.028,
      disabilityYears: 0.2,
    },
    {
      injury: "Knee ligament tear / patella dislocation",
      injuriesPerMillionUnits: 2.7,
      disabilityWeight: 0.113,
      disabilityYears: 0.75,
    },
    {
      injury: "Contusions and sprains (back, neck, ankle)",
      injuriesPerMillionUnits: 10.7,
      disabilityWeight: 0.008,
      disabilityYears: 0.05,
    },
    {
      injury: "Concussion",
      injuriesPerMillionUnits: 1.3,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation:
        "Schoffl VR, Hoffmann G, Kupper T. Acute injury risk and severity in indoor climbing - a prospective analysis of 515,337 indoor climbing wall visits in 5 years. Wilderness Environ Med 2013;24:187-94",
      url: "http://www.paci.com.au/downloads_public/risk/Risk_indoor-climbing_2013.pdf",
    },
    {
      citation:
        "Climbing Wall Association. What five years of claims data can teach your gym about risk (2026)",
      url: "https://www.cwapro.org/blog/what-five-years-of-claims-data-can-teach-your-gym-about-risk",
    },
    {
      citation:
        "American Alpine Club, Accidents in North American Climbing 2022: Auto-Belay Fatality",
      url: "http://publications.americanalpineclub.org/articles/13201216242",
    },
    {
      citation:
        "Schoffl V et al. Evaluation of injury and fatality risk in rock and ice climbing. Sports Med 2010;40:657-79 (search summary only)",
      url: "https://link.springer.com/article/10.2165/11533690-000000000-00000",
    },
  ],
  createdAt: "2026-10-28T19:11:22.447Z",
  updatedAt: "2026-10-28T19:11:22.447Z",
} as const satisfies RiskActivity
