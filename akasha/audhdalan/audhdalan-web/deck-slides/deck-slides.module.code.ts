export type TitleSlide = {
  number: number
  kind: "title"
  title: string
  subtitle: string
  presenter: string
  venue: string
}

export type AboutFactIcon = "brain" | "code" | "heart-pulse" | "gauge"

export type AboutSlide = {
  number: number
  kind: "about"
  title: string
  facts: readonly { value: string; label: string; icon: AboutFactIcon }[]
}

export type AgendaItem = { level: string; name: string; description: string }

export type AgendaSlide = {
  number: number
  kind: "agenda"
  title: string
  items: readonly AgendaItem[]
  closer?: string
}

export type ResourceBarColor = "red" | "blue" | "green"

export type ResourceBar = {
  name: string
  description: string
  color: ResourceBarColor
  fill: number
}

export type StoplightColor = "green" | "yellow" | "red"

export type StoplightItem = {
  name: string
  description: string
  color: StoplightColor
}

export type LevelSlide = {
  number: number
  kind: "level"
  title: string
  tagline: string
  bullets: readonly string[]
  resourceBars?: readonly ResourceBar[]
  stoplight?: readonly StoplightItem[]
}

export type CtaBlock = { label: string; description?: string }

export type CtaSlide = {
  number: number
  kind: "cta"
  title: string
  blocks: readonly CtaBlock[]
  qr?: { src: string; caption: string }
}

export type Slide = TitleSlide | AboutSlide | AgendaSlide | LevelSlide | CtaSlide

export const slides: readonly Slide[] = [
  {
    number: 0,
    kind: "title",
    title: "Making Every Spoon Count",
    subtitle: "Mastering Autistic Energy Accounting",
    presenter: "Alan Walton",
    venue: "AutCon 2026",
  },
  {
    number: 1,
    kind: "about",
    title: "About Alan",
    facts: [
      { icon: "brain", value: "AuDHD", label: "self-diagnosed two years ago at age 38" },
      { icon: "code", value: "18 years", label: "at tech companies" },
      {
        icon: "heart-pulse",
        value: "18 months",
        label: "recovering from autistic burnout",
      },
      { icon: "gauge", value: "20+ years", label: "building measurement systems" },
    ],
  },
  {
    number: 2,
    kind: "agenda",
    title: "What we're going to talk about",
    items: [
      { level: "Level 1", name: "Basic Spoon Counting", description: "Enough, Not Enough" },
      { level: "Level 2", name: "Stoplight Measurement", description: "Green, Yellow, Red" },
      {
        level: "Level 3",
        name: "Resource Bars",
        description: "Health, Mana, Stamina",
      },
    ],
    closer: "Plus: Notion + Google Sheets quick-starts at the end.",
  },
  {
    number: 3,
    kind: "level",
    title: "Level 1: Basic Spoon Counting",
    tagline: "Do I have enough spoons?",
    bullets: [],
  },
  {
    number: 4,
    kind: "level",
    title: "Level 2: Stoplight Measurement",
    tagline: "Relative anchors, moving targets",
    stoplight: [
      {
        name: "Green",
        description: "when you are doing better than normal = ~5 days per month",
        color: "green",
      },
      {
        name: "Yellow",
        description: "when you are doing okay = ~20 days per month",
        color: "yellow",
      },
      {
        name: "Red",
        description: "when you are doing worse than normal = ~5 days per month",
        color: "red",
      },
    ],
    bullets: [],
  },
  {
    number: 5,
    kind: "level",
    title: "Level 3: Resource Bars",
    tagline: "Absolute anchors, measured results",
    resourceBars: [
      {
        name: "Health",
        description: "stress capacity = tolerance for allostatic load",
        color: "red",
        fill: 0.7,
      },
      {
        name: "Mana",
        description: "executive function = energy and neurotransmitter supplies in your brain",
        color: "blue",
        fill: 0.55,
      },
      {
        name: "Stamina",
        description: "physical energy = energy supplies in your body",
        color: "green",
        fill: 0.8,
      },
    ],
    bullets: [],
  },
  {
    number: 6,
    kind: "agenda",
    title: "What we talked about",
    items: [
      { level: "Level 1", name: "Basic Spoon Counting", description: "Enough, Not Enough" },
      { level: "Level 2", name: "Stoplight Measurement", description: "Green, Yellow, Red" },
      {
        level: "Level 3",
        name: "Resource Bars",
        description: "Health, Mana, Stamina",
      },
    ],
    closer: "Plus: Notion + Google Sheets quick-starts at the end.",
  },
  {
    number: 7,
    kind: "cta",
    title: "What's next",
    blocks: [
      {
        label: "Templates at audhdalan.com",
        description: "Notion + Google Sheets — starter scaffolds at all three levels",
      },
      {
        label: "Stay in Touch",
        description: "alan@audhdalan.com",
      },
    ],
    qr: { src: "/autcon-2026/audhdalan-qr.png", caption: "audhdalan.com" },
  },
]
