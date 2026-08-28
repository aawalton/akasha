"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/design-primitives/components/table"

export function StrategicPrismPanel() {
  return (
    <PanelCard id="ds-strategic-prism" collapsible title="Strategic Prism (Kapferer)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Facet</TableHead>
            <TableHead className="text-left">Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">Physique</TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              Minimalist & Dark. High signal-to-noise ratio. A dashboard that looks like a cockpit
              or a developer IDE.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">Personality</TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              Objective & Helpful. The voice of a trusted advisor who respects your time.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">Culture</TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              Transparency & Efficiency. We value the "truth" of the game mechanics over the "hype"
              of the community.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">
              Relationship
            </TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              The Reliable Tool. A relationship based on utility. We are the caliper, not the
              craftsman.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">Reflection</TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              The Efficient Gamer. Someone who wants to play their way, but wants to ensure it is
              viable first.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left align-top font-bold text-accent">Self-Image</TableCell>
            <TableCell className="whitespace-normal text-left text-secondary">
              The Smart Planner. "I research before I commit. I save time and resources by
              simulating first."
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PanelCard>
  )
}
