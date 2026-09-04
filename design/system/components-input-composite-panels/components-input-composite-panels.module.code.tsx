"use client"

import { NumberBadge } from "@akasha/design-badges/number-badge"
import { InlineEditableText } from "@akasha/design-forms/inline-editable-text"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@akasha/design-forms/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@akasha/design-forms/input-otp"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Heading } from "@akasha/design-primitives/heading"
import { Mail, Search, Tag } from "lucide-react"
import { useState } from "react"

export function ComponentsInputCompositePanels() {
  const [otpValue, setOtpValue] = useState("")
  const [editableText, setEditableText] = useState("Click to edit me")
  const [editableEmpty, setEditableEmpty] = useState("")
  const [badgeValue1, setBadgeValue1] = useState(42)
  const [badgeValue2, setBadgeValue2] = useState(7)
  const [badgeValue3, setBadgeValue3] = useState(1)

  return (
    <>
      {}
      <PanelCard id="ds-input-group" collapsible title="Input Group">
        <div className="space-y-4">
          <div className="space-y-1">
            <Heading>Inline-start addon (icon)</Heading>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Search />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." aria-label="Search input with icon" />
            </InputGroup>
          </div>

          <div className="space-y-1">
            <Heading>Inline-end addon (button)</Heading>
            <InputGroup>
              <InputGroupInput placeholder="Enter email..." aria-label="Email input with button" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Subscribe</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-1">
            <Heading>Both inline addons</Heading>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <Mail />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="you@example.com"
                aria-label="Email input with icon and button"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Send</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-1">
            <Heading>Block-start addon</Heading>
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>
                  <Tag />
                  Tags
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Add a tag..."
                aria-label="Input with block-start label"
              />
            </InputGroup>
          </div>

          <div className="space-y-1">
            <Heading>Block-end addon with textarea</Heading>
            <InputGroup>
              <InputGroupTextarea
                placeholder="Write your message..."
                aria-label="Textarea with block-end button"
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton size="sm">Send message</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-input-otp" collapsible title="Input OTP">
        <p className="text-secondary text-sm">
          6-digit code entry with separator. Built on the <code>input-otp</code> library.
        </p>
        <div className="space-y-3">
          <InputOTP maxLength={6} value={otpValue} onComplete={setOtpValue} onChange={setOtpValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-secondary text-sm">
            Value: <code>{otpValue !== "" ? otpValue : "(empty)"}</code>
          </p>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-inline-editable-text" collapsible title="Inline Editable Text">
        <p className="text-secondary text-sm">
          Click-to-edit inline text. Saves on blur or Enter, cancels on Escape. Supports validation
          and maxLength.
        </p>
        <div className="space-y-4">
          <div className="space-y-1">
            <Heading>With value</Heading>
            <InlineEditableText value={editableText} onChange={setEditableText} maxLength={50} />
          </div>
          <div className="space-y-1">
            <Heading>Empty (placeholder visible)</Heading>
            <InlineEditableText
              value={editableEmpty}
              onChange={setEditableEmpty}
              placeholder="Enter a name..."
            />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-editable-badge-number" collapsible title="Editable Badge Number">
        <p className="text-secondary text-sm">
          Click a badge to type a new number. Clamps to min/max on commit. Supports custom format
          and prefix.
        </p>
        <div className="space-y-4">
          <div className="space-y-1">
            <Heading>Default (# prefix, accent variant)</Heading>
            <div className="flex items-center gap-2">
              <NumberBadge
                editable
                value={badgeValue1}
                min={1}
                max={999}
                onChange={setBadgeValue1}
                variant="accent"
              />
              <span className="text-secondary text-sm">min: 1, max: 999</span>
            </div>
          </div>
          <div className="space-y-1">
            <Heading>Custom format and prefix</Heading>
            <div className="flex items-center gap-2">
              <NumberBadge
                editable
                value={badgeValue2}
                min={1}
                max={50}
                onChange={setBadgeValue2}
                format={(n) => `Lv.${n}`}
                prefix="Lv."
                variant="elevation"
              />
              <span className="text-secondary text-sm">min: 1, max: 50</span>
            </div>
          </div>
          <div className="space-y-1">
            <Heading>Elevated-2 variant</Heading>
            <div className="flex items-center gap-2">
              <NumberBadge
                editable
                value={badgeValue3}
                min={1}
                max={12}
                onChange={setBadgeValue3}
                variant="elevation"
              />
              <span className="text-secondary text-sm">min: 1, max: 12</span>
            </div>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
