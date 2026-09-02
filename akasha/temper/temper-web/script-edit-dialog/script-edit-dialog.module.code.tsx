import { Button } from "@akasha/design-primitives/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import {
  getGrimoireCompatibleScripts,
  grimoires,
} from "@akasha/temper-character-skills/scribing-grimoires"
import { getCombinedScriptDescription } from "@akasha/temper-character-skills/scribing-script-description"
import { type AffixScriptId, affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { type FocusScriptId, focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import {
  type SignatureScriptId,
  signatureScripts,
} from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import { useMemo } from "react"
import type { PendingScriptEdits } from "../skills-types/skills-types.module.code.ts"

interface ScriptEditDialogProps {
  open: boolean
  skill: ScribedSkill | null
  pendingEdits: PendingScriptEdits | null
  onSave: () => void
  onCancel: () => void
  onEditChange: (edits: PendingScriptEdits) => void
}

export function ScriptEditDialog({
  open,
  skill,
  pendingEdits,
  onSave,
  onCancel,
  onEditChange,
}: ScriptEditDialogProps) {
  const surface = useSurface()
  const compatible =
    skill?.grimoireId != null ? getGrimoireCompatibleScripts(skill.grimoireId) : null
  let grimoireName = "Edit Scripts"
  if (skill?.grimoireId != null && grimoires.has(skill.grimoireId)) {
    grimoireName = grimoires.data[skill.grimoireId].name
  }

  const description = useMemo(() => {
    if (skill?.grimoireId == null || pendingEdits?.focusScriptId == null) {
      return null
    }

    return getCombinedScriptDescription(
      skill.grimoireId,
      pendingEdits.focusScriptId,
      pendingEdits.signatureScriptId === "no-signature-script"
        ? undefined
        : pendingEdits.signatureScriptId,
      pendingEdits.affixScriptId === "no-affix-script" ? undefined : pendingEdits.affixScriptId
    )
  }, [skill?.grimoireId, pendingEdits])

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{grimoireName}</DialogTitle>
        </DialogHeader>
        {pendingEdits && (
          <DialogBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">Focus</span>
              <Select<FocusScriptId>
                value={pendingEdits.focusScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    focusScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select focus script" />
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "no-focus-script", label: "None" }} sorted>
                  {compatible?.focus
                    .map((id) => focusScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">Signature</span>
              <Select<SignatureScriptId>
                value={pendingEdits.signatureScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    signatureScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  nullSentinel={{ value: "no-signature-script", label: "None" }}
                  sorted
                >
                  {compatible?.signature
                    .map((id) => signatureScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">Affix</span>
              <Select<AffixScriptId>
                value={pendingEdits.affixScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    affixScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "no-affix-script", label: "None" }} sorted>
                  {compatible?.affix
                    .map((id) => affixScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <span className="text-secondary text-sm">Description</span>
              <div
                className={`max-h-[300px] overflow-y-auto rounded-md ${surfaceClass(surface + 1)} p-3`}
              >
                {description != null ? (
                  <div className="space-y-2 text-secondary text-sm leading-relaxed">
                    {description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <Text className="italic">Invalid script combination</Text>
                )}
              </div>
            </div>
          </DialogBody>
        )}
        <DialogFooter className="gap-2">
          <Button variant="tertiary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
