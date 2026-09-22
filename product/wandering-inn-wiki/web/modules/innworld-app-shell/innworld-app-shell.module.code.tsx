import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type {
  AppNavConfig,
  AppNavItem,
} from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import {
  Award,
  BookOpen,
  Brain,
  CalendarClock,
  ChefHat,
  Church,
  Dna,
  Flame,
  Gem,
  Gift,
  Globe,
  Handshake,
  HeartPulse,
  Home,
  type LucideIcon,
  Music,
  Package,
  PawPrint,
  Scroll,
  Shield,
  Skull,
  Sparkle,
  Sparkles,
  Stamp,
  Sun,
  Sword,
  Users,
  Wand2,
} from "lucide-react"
import { useMemo } from "react"

const BRAND = "INNWORLD"

const HOME: AppNavItem = { id: "home", label: "Home", shortLabel: "Home", href: "/", icon: Home }

type PlannedType = { readonly slug: string; readonly icon: LucideIcon; readonly label?: string }

type PlannedGroup = {
  readonly group: string
  readonly icon: LucideIcon
  readonly under: readonly PlannedType[]
}

const PLANNED: readonly (PlannedGroup | PlannedType)[] = [
  { slug: "world-character", icon: Users },
  { slug: "world-class", icon: Shield },
  { slug: "world-skill", icon: Sparkles },
  { slug: "world-spell", icon: Wand2 },
  {
    group: "Powers",
    icon: Flame,
    under: [
      { slug: "world-miracle", icon: Sun },
      { slug: "world-song", icon: Music },
      { slug: "world-legacy", icon: Dna },
      { slug: "world-boon", icon: Gift },
      { slug: "world-carried-memory", icon: Brain },
    ],
  },
  {
    group: "Marks",
    icon: Stamp,
    under: [
      { slug: "world-condition", icon: HeartPulse },
      { slug: "world-title", icon: Award },
      { slug: "world-curse", icon: Skull },
      { slug: "world-reputation", icon: Handshake },
      { slug: "world-aspect", icon: Gem },
    ],
  },
  {
    group: "Things",
    icon: Package,
    under: [
      { slug: "world-item", icon: Sword },
      { slug: "world-enchantment", icon: Sparkle },
      { slug: "world-recipe", icon: ChefHat },
    ],
  },
  {
    group: "World",
    icon: Globe,
    under: [
      { slug: "named-event", icon: CalendarClock },
      { slug: "world-quest", icon: Scroll },
      { slug: "world-species", icon: PawPrint },
      { slug: "world-religion", icon: Church },
      { slug: "world", icon: BookOpen, label: "The Wandering Inn" },
    ],
  },
]

export type Shelved = {
  readonly held: ShownType
  readonly label: string
  readonly icon: LucideIcon
}

export type Shelf =
  | { readonly heading: null; readonly under: readonly Shelved[] }
  | { readonly heading: string; readonly icon: LucideIcon; readonly under: readonly Shelved[] }

function takeOf(planned: PlannedType, left: Map<string, ShownType>): Shelved | null {
  const held = left.get(planned.slug)
  if (held === undefined) return null
  left.delete(planned.slug)
  return { held, label: planned.label ?? held.name, icon: planned.icon }
}

export function shelvesOf(shownTypes: readonly ShownType[]): readonly Shelf[] {
  const left = new Map(shownTypes.map((one) => [one.slug, one]))
  const shelves: Shelf[] = []
  const loose: Shelved[] = []
  const flush = () => {
    if (loose.length === 0) return
    shelves.push({ heading: null, under: [...loose] })
    loose.length = 0
  }
  for (const planned of PLANNED) {
    if ("group" in planned) {
      const under = planned.under
        .map((one) => takeOf(one, left))
        .filter((one): one is Shelved => one !== null)
      if (under.length === 0) continue
      flush()
      shelves.push({ heading: planned.group, icon: planned.icon, under })
      continue
    }
    const alone = takeOf(planned, left)
    if (alone !== null) loose.push(alone)
  }
  for (const one of left.values()) loose.push({ held: one, label: one.name, icon: BookOpen })
  flush()
  return shelves
}

function itemOf(one: Shelved): AppNavItem {
  return {
    id: one.held.slug,
    label: one.label,
    shortLabel: one.label,
    href: `/${one.held.slug}`,
    icon: one.icon,
  }
}

export function navItemsOf(shownTypes: readonly ShownType[]): readonly AppNavItem[] {
  const items: AppNavItem[] = [HOME]
  for (const shelf of shelvesOf(shownTypes)) {
    if (shelf.heading === null) {
      for (const one of shelf.under) items.push(itemOf(one))
      continue
    }
    items.push({
      id: shelf.heading,
      label: shelf.heading,
      shortLabel: shelf.heading,
      icon: shelf.icon,
      children: shelf.under.map(itemOf),
    })
  }
  return items
}

export function AppShell({
  shownTypes,
  children,
}: {
  shownTypes: readonly ShownType[]
  children: React.ReactNode
}) {
  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: navItemsOf(shownTypes),
      bottomSections: [],
      brandLabel: BRAND,
      bottomNavMaxItems: 5,
      navReady: true,
    }),
    [shownTypes]
  )
  return (
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <SharedAppShell config={config}>{children}</SharedAppShell>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
