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

const AUTHOR = "https://wanderinginn.com"

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

function itemOf(planned: PlannedType, held: ShownType): AppNavItem {
  const label = planned.label ?? held.name
  return { id: held.slug, label, shortLabel: label, href: `/${held.slug}`, icon: planned.icon }
}

function takeOf(planned: PlannedType, left: Map<string, ShownType>): AppNavItem | null {
  const held = left.get(planned.slug)
  if (held === undefined) return null
  left.delete(planned.slug)
  return itemOf(planned, held)
}

export function navItemsOf(shownTypes: readonly ShownType[]): readonly AppNavItem[] {
  const left = new Map(shownTypes.map((one) => [one.slug, one]))
  const items: AppNavItem[] = [HOME]
  for (const planned of PLANNED) {
    if ("group" in planned) {
      const under = planned.under
        .map((one) => takeOf(one, left))
        .filter((one): one is AppNavItem => one !== null)
      if (under.length === 0) continue
      items.push({
        id: planned.group,
        label: planned.group,
        shortLabel: planned.group,
        icon: planned.icon,
        children: under,
      })
      continue
    }
    const item = takeOf(planned, left)
    if (item !== null) items.push(item)
  }
  for (const one of left.values()) items.push(itemOf({ slug: one.slug, icon: BookOpen }, one))
  return items
}

function Credit() {
  return (
    <p className="mx-auto max-w-5xl p-4 text-secondary text-sm">
      Innworld is a fan wiki. The Wandering Inn, its characters and its world belong to{" "}
      <a className="underline" href={AUTHOR}>
        pirateaba
      </a>
      .
    </p>
  )
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
        <SharedAppShell config={config}>
          {children}
          <Credit />
        </SharedAppShell>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
