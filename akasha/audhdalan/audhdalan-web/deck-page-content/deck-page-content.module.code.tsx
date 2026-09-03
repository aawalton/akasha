import { PageLayout } from "@akasha/design-layout/page-layout"
import { Heading } from "@akasha/design-primitives/heading"
import { Separator } from "@akasha/design-primitives/separator"
import { Text } from "@akasha/design-primitives/text-body"
import { Brain, Code, Gauge, HeartPulse } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import {
  type AboutFactIcon,
  type AboutSlide,
  type AgendaSlide,
  type CtaSlide,
  type LevelSlide,
  type ResourceBarColor,
  type Slide,
  type StoplightColor,
  slides,
  type TitleSlide,
} from "../deck-slides/deck-slides.module.code.ts"

const ABOUT_FACT_ICONS: Record<AboutFactIcon, typeof Brain> = {
  brain: Brain,
  code: Code,
  "heart-pulse": HeartPulse,
  gauge: Gauge,
}

const total = slides.length

function parseHashIndex(raw: string): number {
  const trimmed = raw.replace(/^#/, "")
  const n = Number(trimmed)
  return Number.isInteger(n) && n >= 0 && n < total ? n : 0
}

export function DeckPageContent() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const sync = () => setIndex(parseHashIndex(window.location.hash))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const go = useCallback((next: number) => {
    if (next < 0 || next >= total) return
    setIndex(next)
    const target = `#${next}`
    if (window.location.hash !== target) {
      window.history.replaceState(null, "", target)
    }
  }, [])

  useEffect(() => {
    const slide = slides[index]
    if (slide != null) {
      document.title = `${slide.title} — AutCon 2026`
    }
  }, [index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }
      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "j":
          event.preventDefault()
          go(index + 1)
          break
        case "ArrowLeft":
        case "k":
          event.preventDefault()
          go(index - 1)
          break
        case "Home":
          event.preventDefault()
          go(0)
          break
        case "End":
          event.preventDefault()
          go(total - 1)
          break
        default:
          return
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, index])

  const slide = slides[index]
  if (!slide) return null

  return (
    <PageLayout>
      <div className="mx-auto hidden min-h-screen w-full max-w-4xl flex-col gap-10 px-6 pt-20 pb-12 sm:flex">
        <div className="flex-1">{renderSlide(slide)}</div>
      </div>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12 sm:hidden">
        {slides.map((s, i) => (
          <section key={s.number} className="flex flex-col gap-16">
            {renderSlide(s)}
            {i < slides.length - 1 ? <Separator /> : null}
          </section>
        ))}
      </div>
    </PageLayout>
  )
}

function renderSlide(slide: Slide) {
  switch (slide.kind) {
    case "title":
      return <TitleSlideView slide={slide} />
    case "about":
      return <AboutSlideView slide={slide} />
    case "agenda":
      return <AgendaSlideView slide={slide} />
    case "level":
      return <LevelSlideView slide={slide} />
    case "cta":
      return <CtaSlideView slide={slide} />
    default:
      throw new Error("unexpected slide kind")
  }
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading variant="subsection" as="h2" className="font-bold text-4xl text-primary">
      {children}
    </Heading>
  )
}

function TitleSlideView({ slide }: { slide: TitleSlide }) {
  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div className="flex flex-col gap-6">
        <Heading variant="subsection" as="h2" className="font-bold text-6xl text-primary">
          {slide.title}
        </Heading>
        <Heading variant="subsection-accent" className="text-2xl">
          {slide.subtitle}
        </Heading>
      </div>
      <div className="space-y-1">
        <Text variant="prose" className="text-lg">
          {slide.presenter}
        </Text>
        <Text variant="caption" className="text-base">
          {slide.venue}
        </Text>
      </div>
    </div>
  )
}

function AboutSlideView({ slide }: { slide: AboutSlide }) {
  return (
    <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
      <div className="flex flex-1 flex-col gap-12">
        <div className="flex flex-col gap-4">
          <SlideTitle>{slide.title}</SlideTitle>
          <Separator className="w-24 bg-accent" />
        </div>
        <ul className="space-y-12">
          {slide.facts.map((fact) => {
            const Icon = ABOUT_FACT_ICONS[fact.icon]
            return (
              <li key={fact.value} className="flex items-center gap-4">
                <Icon className="size-7 shrink-0 text-accent" aria-hidden />
                <Text variant="prose" className="text-xl">
                  <span className="font-bold text-primary">{fact.value}</span> {fact.label}
                </Text>
              </li>
            )
          })}
        </ul>
      </div>
      <img
        src="/autcon-2026/alan-winter.jpg"
        alt="Alan Walton"
        width={320}
        height={427}
        className="rounded-xl object-cover shadow-lg"
      />
    </div>
  )
}

function AgendaSlideView({ slide }: { slide: AgendaSlide }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <SlideTitle>{slide.title}</SlideTitle>
          <Separator className="w-24 bg-accent" />
        </div>
        <ol className="space-y-6">
          {slide.items.map((item) => (
            <li key={item.level} className="flex items-baseline gap-6">
              <Heading variant="subsection-accent" className="w-24 shrink-0 text-xl">
                {item.level}
              </Heading>
              <div className="space-y-1">
                <Heading
                  variant="subsection"
                  as="h3"
                  className="font-semibold text-2xl text-primary"
                >
                  {item.name}
                </Heading>
                <Text variant="prose" className="text-base">
                  {item.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {slide.closer != null ? (
        <Text variant="prose" className="text-base">
          {slide.closer}
        </Text>
      ) : null}
    </div>
  )
}

const RESOURCE_BAR_FILL: Record<ResourceBarColor, string> = {
  red: "bg-red",
  blue: "bg-blue",
  green: "bg-green",
}

const STOPLIGHT_FILL: Record<StoplightColor, string> = {
  green: "bg-green",
  yellow: "bg-yellow",
  red: "bg-red",
}

function BatteryIcon({ colorClass, fill }: { colorClass: string; fill: number }) {
  const pct = Math.max(0, Math.min(1, fill)) * 100
  return (
    <div className="flex items-center" aria-hidden>
      <div className="relative h-3 w-6 rounded-[2px] border border-white/25 p-[1px]">
        <div className={`h-full rounded-[1px] ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="h-1 w-0.5 rounded-r-[1px] bg-white/25" />
    </div>
  )
}

function StoplightCircle({ colorClass }: { colorClass: string }) {
  return <div className={`size-4 rounded-full ${colorClass}`} aria-hidden />
}

function LevelSlideView({ slide }: { slide: LevelSlide }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SlideTitle>{slide.title}</SlideTitle>
            <Separator className="w-24 bg-accent" />
          </div>
          <Heading variant="subsection-accent" className="text-2xl">
            {slide.tagline}
          </Heading>
        </div>
        {slide.resourceBars ? (
          <div className="space-y-6">
            {slide.resourceBars.map((bar) => {
              const terms = bar.description.split(" = ")
              return (
                <div key={bar.name} className="flex items-start gap-3">
                  <div className="flex h-7 items-center">
                    <BatteryIcon colorClass={RESOURCE_BAR_FILL[bar.color]} fill={bar.fill} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-primary">{bar.name}</div>
                    {terms.map((term) => (
                      <Text key={term} variant="prose" className="text-base">
                        {`⇒ ${term}`}
                      </Text>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
        {slide.stoplight ? (
          <div className="space-y-6">
            {slide.stoplight.map((item) => {
              const terms = item.description.split(" = ")
              return (
                <div key={item.name} className="flex items-start gap-3">
                  <div className="flex h-7 items-center">
                    <StoplightCircle colorClass={STOPLIGHT_FILL[item.color]} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-primary">{item.name}</div>
                    {terms.map((term) => (
                      <Text key={term} variant="prose" className="text-base">
                        {`⇒ ${term}`}
                      </Text>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
      {slide.bullets.length > 0 ? (
        <ul className="list-disc space-y-3 pl-6">
          {slide.bullets.map((bullet) => (
            <li key={bullet}>
              <Text variant="prose" as="span" className="text-base">
                {bullet}
              </Text>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function CtaSlideView({ slide }: { slide: CtaSlide }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <SlideTitle>{slide.title}</SlideTitle>
        <Separator className="w-24 bg-accent" />
      </div>
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
        <div className="flex-1 space-y-6">
          {slide.blocks.map((block) => (
            <div key={block.label} className="space-y-1">
              <Heading variant="subsection-accent" className="text-2xl">
                {block.label}
              </Heading>
              {block.description != null ? (
                <Text variant="prose" className="text-base">
                  {block.description}
                </Text>
              ) : null}
            </div>
          ))}
        </div>
        {slide.qr ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={slide.qr.src}
              alt={`QR code for ${slide.qr.caption}`}
              width={240}
              height={240}
              className="rounded-lg bg-white p-3"
            />
            <Text variant="caption" className="text-sm">
              {slide.qr.caption}
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  )
}
