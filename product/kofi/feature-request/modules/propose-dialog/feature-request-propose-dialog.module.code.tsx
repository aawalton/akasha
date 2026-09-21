"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { readPagesAgain } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { PROPOSAL_COST } from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"
import { featureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.ts"
import { postedTo } from "akasha/product/kofi/feature-request/modules/posting/feature-request-posting.module.code.ts"
import { featureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.ts"
import { useState } from "react"

const ASK = "feature-request-ask"

const OPENED =
  "Your request is open, and the points are behind it. Alan publishes it or denies it himself, and a request he denies gives its boosters their points back."

function heldSays(balance: number | null): string {
  const costs = `Opening a request costs ${PROPOSAL_COST} points.`
  return balance === null ? costs : `You hold ${balance} points. ${costs}`
}

export function ProposeDialog({
  open,
  onOpenChange,
  postTo,
  balance,
  onProposed,
}: {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly postTo: string
  readonly balance: number | null
  readonly onProposed?: (slug: string) => void
}): React.ReactNode {
  const [ask, setAsk] = useState("")
  const [working, setWorking] = useState(false)
  const [refused, setRefused] = useState<string | null>(null)
  const [opened, setOpened] = useState(false)

  const close = () => {
    onOpenChange(false)
    setAsk("")
    setWorking(false)
    setRefused(null)
    setOpened(false)
  }

  const send = async () => {
    setWorking(true)
    setRefused(null)
    const landed = await postedTo(postTo, { act: "propose", ask })
    setWorking(false)
    if ("refused" in landed) {
      setRefused(landed.refused)
      return
    }
    onProposed?.(landed.slug)
    setOpened(true)
    void readPagesAgain(featureRequest.slug)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) onOpenChange(true)
        else close()
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Open a feature request</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {opened ? (
            <p className="text-secondary text-sm">{OPENED}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <Label htmlFor={ASK}>What do you want Alan to build?</Label>
              <Textarea
                id={ASK}
                value={ask}
                disabled={working}
                maxLength={featureRequestAsk.maxLength}
                onChange={(event) => setAsk(event.target.value)}
              />
              <p className="text-secondary text-sm">{heldSays(balance)}</p>
              {refused !== null && (
                <p role="alert" className="text-red text-sm">
                  {refused}
                </p>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          {opened ? (
            <Button variant="accent" onClick={close}>
              Done
            </Button>
          ) : (
            <>
              <Button variant="tertiary" onClick={close} disabled={working}>
                Cancel
              </Button>
              <Button
                variant="accent"
                disabled={working || ask.trim() === ""}
                onClick={() => {
                  void send()
                }}
              >
                {working ? (
                  <>
                    <Spinner />
                    Opening...
                  </>
                ) : (
                  `Open it for ${PROPOSAL_COST} points`
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
