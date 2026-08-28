"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/design-primitives/components/table"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function PersonalityTonePanel() {
  return (
    <PanelCard id="ds-personality-tone" collapsible title="Personality & Tone">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading variant="subsection-accent">Aaker's Dimensions</Heading>
          <div className="space-y-2">
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Primary Trait: Competence</Heading>
              <p className="text-secondary text-xs">
                Reliable, Intelligent, Successful, Precision-Engineered
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Secondary Trait: Sincerity</Heading>
              <p className="text-secondary text-xs">
                Honest, Helpful, Down-to-earth, Community-Focused
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading variant="subsection-accent">The Voice</Heading>
          <p className="text-secondary text-sm">
            The voice of Temper is <span className="text-primary">The Smart Assistant</span>. It is
            the voice of a high-end tool—like a sophisticated compiler or an architect's CAD
            software. It never shouts, hypes-up, or judges. It simply informs.
          </p>
          <div className={cn("space-y-1 rounded p-3 text-xs", surfaceClass(2))}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                <span className="font-medium text-primary">Concise:</span> Use the fewest words
                possible to convey the data.
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                <span className="font-medium text-primary">Objective:</span> Avoid subjective
                adjectives. Stick to facts.
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">3.</span>
              <span className="text-secondary">
                <span className="font-medium text-primary">Helpful:</span> Error messages should
                explain why something is wrong, not just that it is wrong.
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading variant="subsection-accent">Voice Guidelines</Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Context</TableHead>
                <TableHead className="text-left">Don't Say</TableHead>
                <TableHead className="text-left">Do Say</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-left text-primary">Greeting</TableCell>
                <TableCell className="whitespace-normal text-left text-secondary">
                  "Welcome, Legend! Ready to dominate?"
                </TableCell>
                <TableCell className="whitespace-normal text-left font-bold text-accent">
                  "Dashboard initialized. Select a build."
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Success</TableCell>
                <TableCell className="whitespace-normal text-left text-secondary">
                  "Boom! This build is a beast!"
                </TableCell>
                <TableCell className="whitespace-normal text-left font-bold text-accent">
                  "Optimization complete. Efficiency increased by 12%."
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Error</TableCell>
                <TableCell className="whitespace-normal text-left text-secondary">
                  "You messed up your gear slots."
                </TableCell>
                <TableCell className="whitespace-normal text-left font-bold text-accent">
                  "Conflict: Two Mythic items detected."
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Feature</TableCell>
                <TableCell className="whitespace-normal text-left text-secondary">
                  "Smash the meta with our calculator."
                </TableCell>
                <TableCell className="whitespace-normal text-left font-bold text-accent">
                  "Simulate combat metrics."
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </PanelCard>
  )
}
