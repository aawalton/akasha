"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@akasha/design-primitives/dialog"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@akasha/design-primitives/table"

const PRINCIPLES = [
  {
    title: "Elevation-First Design",
    description:
      "Visual hierarchy through 5 surface levels (surface-0 through surface-4). When one component is visibly layered on top of another, it should be exactly one level more elevated.",
  },
  {
    title: "Semantic Slot Pattern",
    description:
      "Components use data-slot attributes for styling hooks and debugging. Every component exports a predictable slot name.",
  },
  {
    title: "Composition Over Configuration",
    description:
      "Small, focused primitives that compose together. Card + Badge + Tooltip rather than a single mega-component.",
  },
  {
    title: "State-Centric Interactivity",
    description:
      "Opacity-based state layers (hover: 0.08, focus: 0.12, pressed: 0.12) provide consistent feedback across all components.",
  },
  {
    title: "Dark-First OKLCH Theme",
    description:
      "Perceptually uniform OKLCH colors ensure consistent contrast ratios. Designed primarily for dark mode.",
  },
  {
    title: "Radix UI Foundation",
    description:
      "Radix handles accessibility and behavior, Tailwind handles appearance. Never fight the platform.",
  },
  {
    title: "Variant-Driven Styling",
    description:
      "CVA (class-variance-authority) manages variant combinations. All variants are explicit, no magic props.",
  },
  {
    title: "Accent Text is Always Bold",
    description:
      "When text uses the accent color (Legendary Gold), it must also be bold (font-bold or font-semibold). This reinforces the accent's purpose of highlighting value and results while maintaining visual consistency.",
  },
  {
    title: "Data State-Centric Design",
    description:
      "Every data-displaying component exists in one of four states: Loading, Loaded, Empty, or Error. Visual feedback is immediate and predictable. Skeletons preserve layout; spinners indicate actions in progress.",
  },
]

export function PatternsVisualPanels() {
  return (
    <>
      {}
      <PanelCard id="ds-design-principles" collapsible title="Design Principles">
        <div className="space-y-3">
          {PRINCIPLES.map((principle, i) => (
            <div key={principle.title} className={`space-y-1 rounded-lg p-3 ${surfaceClass(2)}`}>
              <Heading as="div">
                {i + 1}. {principle.title}
              </Heading>
              <p className="text-secondary text-xs">{principle.description}</p>
            </div>
          ))}
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-elevation-nesting" collapsible title="Elevation Nesting">
        <div className="space-y-3">
          <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(2)}`}>
            <p className="text-primary text-sm">Correct: Each layer +1</p>
            <div className={`space-y-1 rounded-lg p-2 ${surfaceClass(0)}`}>
              <span className="text-tertiary text-xs">0</span>
              <div className={`space-y-1 rounded-lg p-2 ${surfaceClass(1)}`}>
                <span className="text-tertiary text-xs">1</span>
                <div className={`space-y-1 rounded-lg p-2 ${surfaceClass(2)}`}>
                  <span className="text-tertiary text-xs">2</span>
                  <div className={`rounded-lg p-2 ${surfaceClass(3)}`}>
                    <span className="text-tertiary text-xs">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(3)}`}>
            <p className="text-secondary text-sm">Incorrect: Skipping levels</p>
            <div className={`space-y-1 rounded-lg p-2 ${surfaceClass(0)}`}>
              <span className="text-tertiary text-xs">0</span>
              <div className={`rounded-lg p-2 ${surfaceClass(3)}`}>
                <span className="text-tertiary text-xs">3 (skipped 1, 2!)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Heading>Dialog Resets Stack</Heading>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Open Dialog Demo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog at surface-1</DialogTitle>
                <DialogDescription>The overlay resets the elevation stack.</DialogDescription>
              </DialogHeader>
              <DialogBody className="space-y-2 py-4">
                <div className="text-tertiary text-xs">Dialog (surface-1)</div>
                <div className={`space-y-2 rounded-lg p-3 ${surfaceClass(2)}`}>
                  <div className="text-tertiary text-xs">Nested (surface-2)</div>
                  <div className={`rounded p-2 ${surfaceClass(3)}`}>
                    <span className="text-tertiary text-xs">Deepest (surface-3)</span>
                  </div>
                </div>
              </DialogBody>
            </DialogContent>
          </Dialog>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-state-layer-implementation" collapsible title="State Layer Implementation">
        <p className="text-secondary text-sm">
          Buttons use a pseudo-element overlay for state feedback:
        </p>
        <div className={`rounded-lg p-3 ${surfaceClass(2)}`}>
          <code className="block whitespace-pre-wrap font-mono text-secondary text-xs">
            {`after:absolute after:inset-0
after:bg-secondary after:opacity-0
hover:after:opacity-[var(--state-hover)]
focus:after:opacity-[var(--state-focus)]
active:after:opacity-[var(--state-pressed)]`}
          </code>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-cursor-feedback" collapsible title="Cursor Feedback">
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">State</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-left text-primary">Clickable</TableCell>
                <TableCell className="font-bold font-mono text-accent">cursor-pointer</TableCell>
                <TableCell className="text-secondary">
                  Buttons, links, all interactive elements
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Disabled</TableCell>
                <TableCell className="font-bold font-mono text-accent">
                  cursor-not-allowed
                </TableCell>
                <TableCell className="text-secondary">Disabled buttons and inputs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Loading</TableCell>
                <TableCell className="font-bold font-mono text-accent">cursor-wait</TableCell>
                <TableCell className="text-secondary">During async operations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Draggable</TableCell>
                <TableCell className="font-bold font-mono text-accent">cursor-grab</TableCell>
                <TableCell className="text-secondary">Element can be grabbed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left text-primary">Dragging</TableCell>
                <TableCell className="font-bold font-mono text-accent">cursor-grabbing</TableCell>
                <TableCell className="text-secondary">Element is being dragged</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <Heading>Rules</Heading>
            <ol className="list-inside list-decimal space-y-1 text-secondary text-sm">
              <li>
                <span className="font-medium text-primary">Pointer for all clickables</span> — Use{" "}
                <code className="font-mono text-xs">cursor-pointer</code> on buttons and links.
                Users expect the hand icon for anything interactive.
              </li>
              <li>
                <span className="font-medium text-primary">Disabled = not-allowed</span> — Always
                pair disabled state with{" "}
                <code className="font-mono text-xs">cursor-not-allowed</code>.
              </li>
              <li>
                <span className="font-medium text-primary">Loading = wait</span> — Switch to{" "}
                <code className="font-mono text-xs">cursor-wait</code> during API calls or heavy
                processing.
              </li>
              <li>
                <span className="font-medium text-primary">Two-step drag</span> —{" "}
                <code className="font-mono text-xs">cursor-grab</code> on hover,{" "}
                <code className="font-mono text-xs">cursor-grabbing</code> on active drag. Always
                provide both.
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <Heading>Live Demo</Heading>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" className="cursor-pointer">
                Pointer
              </Button>
              <Button variant="secondary" disabled className="cursor-not-allowed">
                Not Allowed
              </Button>
              <Button variant="secondary" className="cursor-wait">
                Wait
              </Button>
              <div
                className={`flex cursor-grab items-center rounded-lg px-4 py-2 text-primary text-sm active:cursor-grabbing ${surfaceClass(2)}`}
              >
                Grab me
              </div>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-slot-pattern" collapsible title="Slot Pattern">
        <p className="text-secondary text-sm">
          All components use data-slot attributes for styling hooks:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "button",
            "badge",
            "card",
            "dialog-content",
            "popover-content",
            "tooltip-content",
            "input",
            "tabs",
          ].map((slot) => (
            <Badge key={slot} variant="elevation">
              data-slot="{slot}"
            </Badge>
          ))}
        </div>
      </PanelCard>
    </>
  )
}
