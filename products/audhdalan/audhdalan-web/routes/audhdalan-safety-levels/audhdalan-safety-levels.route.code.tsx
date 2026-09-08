import { PageLayout } from "@akasha/design-layout/page-layout"
import { Heading } from "@akasha/design-primitives/heading"
import { Separator } from "@akasha/design-primitives/separator"
import { Text } from "@akasha/design-primitives/text-body"

type LevelRow = {
  level: string
  anchor: string
  activities: string
}

const LEVELS: readonly LevelRow[] = [
  {
    level: "5",
    anchor: "Can be outgoing",
    activities: "Initiating conversations, paying active attention to others, caring about others",
  },
  {
    level: "4",
    anchor: "Can be secure",
    activities: "Conflict, singing, dancing, being perceived",
  },
  {
    level: "3",
    anchor: "Can feel happiness",
    activities: "Being social, nature, food, music, aesthetic experiences",
  },
  {
    level: "2",
    anchor: "Can be productive",
    activities: "Programming, projects, chores",
  },
  {
    level: "1",
    anchor: "Can rest",
    activities: "Reading fiction, watching shows, playing games",
  },
  {
    level: "0",
    anchor: "Can tolerate existing",
    activities: "Can lie down in a dark room and count",
  },
  {
    level: "-1",
    anchor: "Sympathetic dominance",
    activities: "Fight, flight, freeze, fawn",
  },
  {
    level: "-2",
    anchor: "Parasympathetic flop",
    activities: "Flop, complete physical systems shutdown",
  },
]

export function meta() {
  return [{ title: "Safety Levels — audhdalan" }]
}

export default function SafetyLevelsPage() {
  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pt-20 pb-16">
        <div className="flex flex-col gap-4">
          <Heading variant="subsection" as="h2" className="font-bold text-5xl text-primary">
            Safety Levels
          </Heading>
          <Separator className="w-24 bg-accent" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-accent border-b-2">
                <th className="px-4 py-3 font-semibold text-primary text-sm uppercase tracking-wide">
                  Level
                </th>
                <th className="px-4 py-3 font-semibold text-primary text-sm uppercase tracking-wide">
                  Anchor
                </th>
                <th className="px-4 py-3 font-semibold text-primary text-sm uppercase tracking-wide">
                  Activities
                </th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((row) => (
                <tr key={row.level} className="border-white/10 border-b">
                  <td className="px-4 py-3 font-bold text-lg text-primary">{row.level}</td>
                  <td className="px-4 py-3 align-top">
                    <Text variant="prose" as="span" className="font-semibold text-base">
                      {row.anchor}
                    </Text>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Text variant="prose" as="span" className="text-base">
                      {row.activities}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  )
}
